import { getClassIdentifier, NodeType, type TSESTreeClass } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { _, MutList, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-state";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isKeyLiteralLike(
  node: TSESTree.MemberExpression | TSESTree.MethodDefinition | TSESTree.Property | TSESTree.PropertyDefinition,
  property: TSESTree.Node,
): boolean {
  return property.type === NodeType.Literal
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    || (property.type === NodeType.TemplateLiteral && property.expressions.length === 0)
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    || (!node.computed && property.type === NodeType.Identifier);
}

function isThisExpression(node: TSESTree.Expression): boolean {
  if (node.type === NodeType.TSAsExpression) {
    return isThisExpression(node.expression);
  }

  return node.type === NodeType.ThisExpression;
}

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): O.Option<string> {
  if (node.type === NodeType.TSAsExpression) {
    return getName(node.expression);
  }
  if (node.type === NodeType.Identifier || node.type === NodeType.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === NodeType.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === NodeType.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === NodeType.MemberExpression
    && isThisExpression(left.object)
    && O.exists(getName(left.property), name => name === "state")
  );
}

const isGetDerivedStateFromProps = isMatching({
  static: true,
  key: {
    name: "getDerivedStateFromProps",
  },
  value: {
    params: P.array(),
  },
});

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "Prevents unused state of class component.",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNUSED_STATE: 'Unused state of class component "{{className}}".',
    },
  },
  defaultOptions: [],
  create(context) {
    const classStack = MutList.make<TSESTreeClass>();
    const methodStack = MutList.make<TSESTree.MethodDefinition | TSESTree.PropertyDefinition>();
    const constructorStack = MutList.make<TSESTree.MethodDefinition>();
    const stateDefs = new WeakMap<TSESTreeClass, [O.Option<TSESTree.Node>, boolean]>();
    function classEnter(node: TSESTreeClass) {
      MutList.append(classStack, node);
    }
    function classExit() {
      const currentClass = MutList.pop(classStack);
      if (!currentClass || !isClassComponent(currentClass, context)) return;
      const className = O.map(getClassIdentifier(currentClass), id => id.name);
      const [def, isUsed] = stateDefs.get(currentClass) ?? [O.none(), false];
      if (O.isNone(def) || isUsed) return;
      context.report({
        node: def.value,
        messageId: "NO_UNUSED_STATE",
        data: {
          className: O.getOrElse(className, () => "Component"),
        },
      });
    }
    function methodEnter(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      MutList.append(methodStack, node);
      const currentClass = MutList.tail(classStack);
      if (!currentClass || !isClassComponent(currentClass, context)) return;
      if (node.static) {
        if (isGetDerivedStateFromProps(node) && node.value.params.length > 1) {
          const [def] = stateDefs.get(currentClass) ?? [O.none()];
          stateDefs.set(currentClass, [def, true]);
        }

        return;
      }
      if (O.exists(getName(node.key), name => name === "state")) {
        stateDefs.set(currentClass, [O.some(node.key), false]);
      }
    }
    function methodExit() {
      MutList.pop(methodStack);
    }
    function constructorEnter(node: TSESTree.MethodDefinition) {
      MutList.append(constructorStack, node);
    }
    function constructorExit() {
      MutList.pop(constructorStack);
    }

    return {
      ClassDeclaration: classEnter,
      ClassExpression: classEnter,
      "ClassDeclaration:exit": classExit,
      "ClassExpression:exit": classExit,
      MethodDefinition: methodEnter,
      PropertyDefinition: methodEnter,
      "MethodDefinition:exit": methodExit,
      "PropertyDefinition:exit": methodExit,
      "MethodDefinition[key.name='constructor']": constructorEnter,
      "MethodDefinition[key.name='constructor']:exit": constructorExit,
      AssignmentExpression(node) {
        if (!isAssignmentToThisState(node)) return;
        const currentClass = MutList.tail(classStack);
        if (!currentClass || !isClassComponent(currentClass, context)) return;
        const currentConstructor = MutList.tail(constructorStack);
        if (!currentConstructor || !currentClass.body.body.includes(currentConstructor)) return;
        const [_, isUsed] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [O.some(node.left), isUsed]);
      },
      MemberExpression(node) {
        if (!isThisExpression(node.object)) return;
        // detect `this.state`
        if (!O.exists(getName(node.property), name => name === "state")) return;
        const currentClass = MutList.tail(classStack);
        if (!currentClass || !isClassComponent(currentClass, context)) return;
        const currentMethod = MutList.tail(methodStack);
        if (!currentMethod || currentMethod.static) return;
        if (currentMethod === MutList.tail(constructorStack)) return;
        if (!currentClass.body.body.includes(currentMethod)) return;
        const [def] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [def, true]);
      },
      VariableDeclarator(node) {
        const currentClass = MutList.tail(classStack);
        if (!currentClass || !isClassComponent(currentClass, context)) return;
        const currentMethod = MutList.tail(methodStack);
        if (!currentMethod || currentMethod.static) return;
        if (currentMethod === MutList.tail(constructorStack)) return;
        if (!currentClass.body.body.includes(currentMethod)) return;
        // detect `{ foo, state: baz } = this`
        if (!(node.init && isThisExpression(node.init) && node.id.type === NodeType.ObjectPattern)) return;
        const hasState = node.id.properties.some(prop => {
          if (prop.type === NodeType.Property && isKeyLiteralLike(prop, prop.key)) {
            return O.exists(getName(prop.key), name => name === "state");
          }

          return false;
        });
        if (!hasState) return;
        const [def] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [def, true]);
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
