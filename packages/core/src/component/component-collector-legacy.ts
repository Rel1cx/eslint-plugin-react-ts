import { NodeType, traverseUp, type TSESTreeClass, type TSESTreeFunction } from "@eslint-react/ast";
import { getPragmaFromContext } from "@eslint-react/jsx";
import { E } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type Scope } from "@typescript-eslint/scope-manager";
import { type TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match, P } from "ts-pattern";

const isRenderMethodLike = isMatching({
  type: P.union(NodeType.MethodDefinition, NodeType.PropertyDefinition),
  key: {
    type: NodeType.Identifier,
    name: "render",
  },
  parent: {
    type: NodeType.ClassBody,
    parent: {
      type: NodeType.ClassDeclaration,
    },
  },
});

/**
 * Check if a node is a React class component
 * @param node The AST node to check
 * @param context The rule context
 * @deprecated It will be removed in the future
 */
export function isClassComponent(node: TSESTree.Node, context: RuleContext): node is TSESTreeClass {
  if (!("superClass" in node && node.superClass)) {
    return false;
  }
  const maybeReact = getPragmaFromContext(context);
  if (E.isLeft(maybeReact)) {
    return false;
  }
  const pragma = maybeReact.right;
  const { superClass } = node;

  return match(superClass)
    .with({ type: NodeType.Identifier, name: P.string }, ({ name }) => /^(Pure)?Component$/u.test(name))
    .with(
      {
        type: NodeType.MemberExpression,
        object: { name: pragma },
        property: { name: P.string },
      },
      ({ property }) => /^(Pure)?Component$/u.test(property.name),
    )
    .otherwise(() => false);
}

/**
 * Get the parent class component of a node up to global scope
 * @param context The rule context
 * @deprecated It will be removed in the future
 */
export function getParentClassComponent(context: RuleContext) {
  let scope: Scope | null = context.getScope();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  while (scope && scope.type !== "class") {
    scope = scope.upper;
  }

  const node = scope?.block;

  if (!node || !isClassComponent(node, context)) {
    return null;
  }

  return node;
}

/**
 * Check if a node is a React PureComponent
 * @param node The AST node to check
 * @param context The rule context
 * @deprecated It will be removed in the future
 */
export function isPureComponent(node: TSESTree.Node, context: RuleContext) {
  const pragma = getPragmaFromContext(context);

  const sourceCode = context.getSourceCode();

  if (E.isRight(pragma) && "superClass" in node && node.superClass) {
    const text = sourceCode.getText(node.superClass);

    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(`^(${pragma.right}\\.)?PureComponent$`, "u").test(text);
  }

  return false;
}

/**
 * Check if a node is a MemberExpression of state
 * @param node The AST node to check
 * @deprecated It will be removed in the future
 */
export const isStateMemberExpression: (node: TSESTree.Node) => boolean = isMatching({
  type: NodeType.MemberExpression,
  object: {
    type: NodeType.ThisExpression,
  },
  property: {
    name: "state",
  },
});

export function isFunctionOfRenderMethod(node: TSESTreeFunction, context: RuleContext) {
  if (!isRenderMethodLike(node.parent)) {
    return false;
  }

  return isClassComponent(node.parent.parent.parent, context);
}

/**
 * Check whether given node is declared inside class component's render block
 * ```jsx
 * class Component extends React.Component {
 *   render() {
 *     class NestedClassComponent extends React.Component {
 *      render() { return <div />; }
 *     }
 *     const nestedFunctionComponent = () => <div />;
 *  }
 * }
 * ```
 * @param node The AST node being checked
 * @param context
 * @returns `true` if node is inside class component's render block, `false` if not
 * @deprecated It will be removed in the future
 */
export function isInsideRenderMethod(node: TSESTree.Node, context: RuleContext) {
  const predicate = (node: TSESTree.Node): node is TSESTree.MethodDefinition => {
    const isRenderMethod = isRenderMethodLike(node);

    return isRenderMethod && isClassComponent(node.parent.parent, context);
  };

  return !!traverseUp(node, predicate);
}

const seenComponents = new WeakSet<TSESTreeClass>();

export function componentCollectorLegacy(context: RuleContext) {
  const components: TSESTreeClass[] = [];

  const ctx = {
    getAllComponents(): E.Either<Error, TSESTreeClass[]> {
      if (context.getScope().block.type !== NodeType.Program) {
        return E.left(new Error("getAllComponents should only be called in Program:exit"));
      }

      return E.right(components);
    },
    getCurrentComponents() {
      return [...components];
    },
  } as const;

  const collect = (node: TSESTreeClass) => {
    if (seenComponents.has(node)) {
      components.push(node);
    }

    if (!isClassComponent(node, context)) {
      return;
    }

    seenComponents.add(node);
    components.push(node);
  };

  const listeners = {
    ClassDeclaration: collect,
    ClassExpression: collect,
  } as const satisfies RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
