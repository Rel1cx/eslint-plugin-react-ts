import { isKeyLiteralLike, isThisExpression, NodeType } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import * as R from "remeda";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-access-state-in-setstate";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;

  return (
    callee.type === NodeType.MemberExpression
    && isThisExpression(callee.object)
    && callee.property.type === NodeType.Identifier
    && callee.property.name === "setState"
  );
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

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow accessing 'this.state' within 'setState'",
    },
    messages: {
      NO_ACCESS_STATE_IN_SETSTATE: "Do not access 'this.state' within 'setState'. Use the update function instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const classStack: [
      node: TSESTree.ClassDeclaration | TSESTree.ClassExpression,
      isComponent: boolean,
    ][] = [];
    const methodStack: [
      node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition,
      isStatic: boolean,
    ][] = [];
    const setStateStack: [
      node: TSESTree.CallExpression,
      hasThisState: boolean,
    ][] = [];
    return {
      CallExpression(node) {
        if (!isThisSetState(node)) return;
        setStateStack.push([node, false]);
      },
      "CallExpression:exit"(node) {
        if (!isThisSetState(node)) return;
        setStateStack.pop();
      },
      ClassDeclaration(node) {
        classStack.push([node, isClassComponent(node)]);
      },
      "ClassDeclaration:exit"() {
        classStack.pop();
      },
      ClassExpression(node) {
        classStack.push([node, isClassComponent(node)]);
      },
      "ClassExpression:exit"() {
        classStack.pop();
      },
      MemberExpression(node) {
        if (!isThisExpression(node.object)) return;
        const [currentClass, isComponent] = R.last(classStack) ?? [];
        if (!currentClass || !isComponent) return;
        const [currentMethod, isStatic] = R.last(methodStack) ?? [];
        if (!currentMethod || isStatic) return;
        const [setState, hasThisState] = R.last(setStateStack) ?? [];
        if (!setState || hasThisState) return;
        if (!O.exists(getName(node.property), name => name === "state")) return;
        context.report({ messageId: "NO_ACCESS_STATE_IN_SETSTATE", node });
      },
      MethodDefinition(node) {
        methodStack.push([node, node.static]);
      },
      "MethodDefinition:exit"() {
        methodStack.pop();
      },
      PropertyDefinition(node) {
        methodStack.push([node, node.static]);
      },
      "PropertyDefinition:exit"() {
        methodStack.pop();
      },
      VariableDeclarator(node) {
        const [currentClass, isComponent] = R.last(classStack) ?? [];
        if (!currentClass || !isComponent) return;
        const [currentMethod, isStatic] = R.last(methodStack) ?? [];
        if (!currentMethod || isStatic) return;
        const [setState, hasThisState] = R.last(setStateStack) ?? [];
        if (!setState || hasThisState) return;
        // detect `{ foo, state: baz } = this`
        if (!(node.init && isThisExpression(node.init) && node.id.type === NodeType.ObjectPattern)) return;
        const hasState = node.id.properties.some(prop => {
          if (prop.type === NodeType.Property && isKeyLiteralLike(prop, prop.key)) {
            return O.exists(getName(prop.key), name => name === "state");
          }
          return false;
        });
        if (!hasState) return;
        context.report({ messageId: "NO_ACCESS_STATE_IN_SETSTATE", node });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
