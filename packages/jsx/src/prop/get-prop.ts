import { findVariableByNameUpToGlobal, getStaticValue, getVariableInit, is, NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

/**
 * Get the name of a JSX attribute with namespace
 * @param node The JSX attribute node
 * @returns string
 */
export function getPropName(node: TSESTree.JSXAttribute) {
  return match(node.name)
    .when(is(NodeType.JSXIdentifier), (n) => n.name)
    .when(is(NodeType.JSXNamespacedName), (n) => `${n.namespace.name}:${n.name.name}`)
    .exhaustive();
}

export function getProp(
  props: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propName: string,
  context: RuleContext,
): O.Option<TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute> {
  return findPropInAttributes(props, context)(propName);
}

/**
 * Gets and resolves the static value of a JSX attribute
 * @param attribute The JSX attribute to get the value of
 * @param context The rule context
 * @returns  The static value of the given JSX attribute
 */
export function getPropValue(
  attribute: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  context: RuleContext,
) {
  const scope = context.getScope();
  if (attribute.type === NodeType.JSXAttribute && "value" in attribute) {
    const { value } = attribute;
    if (value === null) {
      return O.none();
    }
    if (value.type === NodeType.Literal) {
      return O.some(getStaticValue(value, scope));
    }
    if (value.type === NodeType.JSXExpressionContainer) {
      return O.some(getStaticValue(value.expression, scope));
    }

    return O.none();
  }
  const { argument } = attribute;

  return O.some(getStaticValue(argument, scope));
}

/**
 * @param properties The properties to search in
 * @param context The rule context
 * @param seenProps The properties that have already been seen
 * @returns A function that searches for a property in the given properties
 */
export function findPropInProperties(
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[] | TSESTree.ObjectLiteralElement[],
  context: RuleContext,
  seenProps: string[] = [],
) {
  const startScope = context.getScope();

  /**
   * Search for a property in the given properties
   * @param propName The name of the property to search for
   * @returns The property if found
   */
  return (propName: string): O.Option<(typeof properties)[number]> => {
    return O.fromNullable(
      properties.find((prop) => {
        return match(prop)
          .when(is(NodeType.Property), (prop) => {
            return "name" in prop.key && prop.key.name === propName;
          })
          .when(is(NodeType.SpreadElement), (prop) => {
            return match(prop.argument)
              .when(is(NodeType.Identifier), (argument) => {
                const { name } = argument;
                const maybeInit = O.flatMap(
                  findVariableByNameUpToGlobal(name, startScope),
                  getVariableInit(0),
                );
                if (O.isNone(maybeInit)) {
                  return false;
                }
                const init = maybeInit.value;

                if (init.type !== NodeType.ObjectExpression) {
                  return false;
                }

                if (seenProps.includes(name)) {
                  return false;
                }

                return O.isSome(findPropInProperties(init.properties, context, [...seenProps, name])(propName));
              })
              .when(is(NodeType.ObjectExpression), (argument) => {
                return O.isSome(findPropInProperties(argument.properties, context, seenProps)(propName));
              })
              .when(is(NodeType.MemberExpression), () => {
                // Not implemented
              })
              .when(is(NodeType.CallExpression), () => {
                // Not implemented
              })
              .otherwise(F.constFalse);
          })
          .when(is(NodeType.RestElement), () => {
            // Not implemented
            return false;
          })
          .otherwise(F.constFalse);
      }),
    );
  };
}

/**
 * @param attributes The attributes to search in
 * @param context The rule context
 * @returns A function that searches for a property in the given attributes
 */
export function findPropInAttributes(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  context: RuleContext,
) {
  const startScope = context.getScope();

  /**
   * Search for a property in the given attributes
   * @param propName The name of the property to search for
   * @returns The property if found
   */
  return (propName: string) => {
    return O.fromNullable(
      attributes.find((attr) => {
        return match(attr)
          .when(is(NodeType.JSXAttribute), (attr) => getPropName(attr) === propName)
          .when(is(NodeType.JSXSpreadAttribute), (attr) => {
            return match<typeof attr.argument, boolean>(attr.argument)
              .with({ type: NodeType.Identifier }, (argument) => {
                const { name } = argument;
                const maybeInit = O.flatMap(
                  findVariableByNameUpToGlobal(name, startScope),
                  getVariableInit(0),
                );
                if (O.isNone(maybeInit)) {
                  return false;
                }
                const init = maybeInit.value;

                if (!("properties" in init)) {
                  return false;
                }

                return O.isSome(findPropInProperties(init.properties, context)(propName));
              })
              .when(is(NodeType.ObjectExpression), (argument) => {
                return O.isSome(findPropInProperties(argument.properties, context)(propName));
              })
              .when(is(NodeType.MemberExpression), () => {
                // Not implemented
                return false;
              })
              .when(is(NodeType.CallExpression), () => {
                // Not implemented
                return false;
              })
              .otherwise(F.constFalse);
          })
          .otherwise(F.constFalse);
      }),
    );
  };
}
