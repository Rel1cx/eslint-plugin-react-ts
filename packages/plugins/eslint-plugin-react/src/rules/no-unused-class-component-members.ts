import { getClassIdentifier, isOneOf, NodeType, traverseUp, type TSESTreeClass } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { F, MutList, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-class-component-members";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type Property =
  | (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)["key"]
  | TSESTree.MemberExpression["property"];

const LIFECYCLE_METHODS = new Set([
  "constructor",
  "componentDidCatch",
  "componentDidMount",
  "componentDidUpdate",
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUnmount",
  "componentWillUpdate",
  "getSnapshotBeforeUpdate",
  "shouldComponentUpdate",
  "UNSAFE_componentWillMount",
  "UNSAFE_componentWillReceiveProps",
  "UNSAFE_componentWillUpdate",
  "state",
  "render",
]);

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

// Return the name of an identifier or the string value of a literal. Useful
// anywhere that a literal may be used as a key (e.g., member expressions,
// method definitions, ObjectExpression property keys).
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

function isThisExpression(node: TSESTree.Expression): boolean {
  if (node.type === NodeType.TSAsExpression) {
    return isThisExpression(node.expression);
  }

  return node.type === NodeType.ThisExpression;
}

function isWrappedByNonArrowFunction(
  node: TSESTree.Node,
  ctx: {
    currentMethod: TSESTree.MethodDefinition | TSESTree.PropertyDefinition;
  },
) {
  const { currentMethod } = ctx;

  return F.pipe(
    node,
    traverseUp(n => isOneOf([NodeType.FunctionDeclaration, NodeType.FunctionExpression])(n) || n === currentMethod),
    O.exists(n => {
      if (n.type === NodeType.FunctionDeclaration) return true;
      if (n.type === NodeType.FunctionExpression) {
        return F.pipe(
          n,
          traverseUp(isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])),
          O.exists(m => m !== currentMethod),
        );
      }

      return false;
    }),
  );
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNUSED_CLASS_COMPONENT_MEMBERS: 'Unused method or property "{{methodName}}" of class "{{className}}".',
    },
  },
  defaultOptions: [],
  create(context) {
    const classStack = MutList.make<TSESTreeClass>();
    const methodStack = MutList.make<TSESTree.MethodDefinition | TSESTree.PropertyDefinition>();
    const propertyDefs = new WeakMap<TSESTreeClass, Set<Property>>();
    const propertyUsages = new WeakMap<TSESTreeClass, Set<string>>();
    function classEnter(node: TSESTreeClass) {
      MutList.append(classStack, node);
      if (!isClassComponent(node, context)) return;
      propertyDefs.set(node, new Set());
      propertyUsages.set(node, new Set());
    }
    function classExit() {
      const currentClass = MutList.pop(classStack);
      if (!currentClass || !isClassComponent(currentClass, context)) return;
      const className = O.map(getClassIdentifier(currentClass), id => id.name);
      const defs = propertyDefs.get(currentClass);
      const usages = propertyUsages.get(currentClass);
      if (!defs) return;
      for (const def of defs) {
        const name = getName(def);
        if (O.isNone(name)) continue;
        if (!!usages?.has(name.value) || LIFECYCLE_METHODS.has(name.value)) continue;
        context.report({
          node: def,
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
          data: {
            methodName: name.value,
            className: O.getOrElse(className, () => "Component"),
          },
        });
      }
    }
    function methodEnter(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      MutList.append(methodStack, node);
      const currentClass = MutList.tail(classStack);
      if (!currentClass || !isClassComponent(currentClass, context)) return;
      if (node.static) return;
      if (isKeyLiteralLike(node, node.key)) {
        propertyDefs.get(currentClass)?.add(node.key);
      }
    }
    function methodExit() {
      MutList.pop(methodStack);
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
      MemberExpression(node) {
        const currentClass = MutList.tail(classStack);
        const currentMethod = MutList.tail(methodStack);
        if (!currentClass || !currentMethod) return;
        if (!isClassComponent(currentClass, context) || currentMethod.static) return;
        if (!isThisExpression(node.object) || !isKeyLiteralLike(node, node.property)) return;
        if (isWrappedByNonArrowFunction(node, { currentMethod })) return;
        if (node.parent.type === NodeType.AssignmentExpression && node.parent.left === node) {
          // detect `this.property = xxx`
          propertyDefs.get(currentClass)?.add(node.property);

          return;
        }
        // detect `this.property()`, `x = this.property`, etc.
        O.map(getName(node.property), name => propertyUsages.get(currentClass)?.add(name));
      },
      VariableDeclarator(node) {
        const currentClass = MutList.tail(classStack);
        const currentMethod = MutList.tail(methodStack);
        if (!currentClass || !currentMethod) return;
        if (!isClassComponent(currentClass, context) || currentMethod.static) return;
        if (isWrappedByNonArrowFunction(node, { currentMethod })) return;
        // detect `{ foo, bar: baz } = this`
        if (node.init && isThisExpression(node.init) && node.id.type === NodeType.ObjectPattern) {
          for (const prop of node.id.properties) {
            if (prop.type === NodeType.Property && isKeyLiteralLike(prop, prop.key)) {
              O.map(getName(prop.key), name => propertyUsages.get(currentClass)?.add(name));
            }
          }
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
