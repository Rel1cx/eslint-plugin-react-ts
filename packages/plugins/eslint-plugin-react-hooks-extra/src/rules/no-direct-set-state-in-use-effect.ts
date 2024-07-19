import type { TSESTreeFunction } from "@eslint-react/ast";
import { is, isFunction, isIIFE, NodeType, traverseUp } from "@eslint-react/ast";
import { isReactHookCallWithNameLoose, isUseEffectCall, isUseStateCall } from "@eslint-react/core";
import { getESLintReactSettings } from "@eslint-react/shared";
import { F, MutList, MutRef, O } from "@eslint-react/tools";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ConstantCase } from "string-ts";
import { isMatching, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-effect";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type CallKind = "other" | "setState" | "then" | "useEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "effect" | "immediate" | "other";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useEffect'",
    },
    messages: {
      NO_DIRECT_SET_STATE_IN_USE_EFFECT: "Do not call the 'set' function of 'useState' directly in 'useEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getESLintReactSettings(context.settings);
    const { useEffect: useEffectAlias = [], useState: useStateAlias = [] } = settings.additionalHooks ?? {};
    function isUseEffectCallWithAlias(node: TSESTree.CallExpression) {
      return isUseEffectCall(node, context) || useEffectAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isUseStateCallWithAlias(node: TSESTree.CallExpression) {
      return isUseStateCall(node, context) || useStateAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isEffectFunction(node: TSESTree.Node) {
      return node.parent?.type === NodeType.CallExpression
        && node.parent.callee !== node
        && isUseEffectCallWithAlias(node.parent);
    }
    function isCleanUpFunction(_: TSESTree.Node) {}
    function isFromUseStateCall(id: TSESTree.Identifier | TSESTree.MemberExpression) {
      return F.pipe(
        match(id)
          .with({ type: NodeType.Identifier }, (n) => O.some(n.name))
          .with({
            type: NodeType.MemberExpression,
            object: { type: NodeType.Identifier },
          }, (n) => O.some(n.object.name))
          .otherwise(O.none),
        O.flatMap(findVariable(context.sourceCode.getScope(id))),
        O.flatMap(getVariableInit(0)),
        O.filter(is(NodeType.CallExpression)),
        O.exists(isUseStateCallWithAlias),
      );
    }
    function isSetStateCall(node: TSESTree.CallExpression) {
      const id = match(node.callee)
        // const [data, setData] = useState();
        // setData();
        .with({ type: NodeType.Identifier }, O.some)
        // const data = useState();
        // data[1]();
        .with({ type: NodeType.MemberExpression }, (n) => {
          if (!("name" in n.object)) return O.none();
          const initialScope = context.sourceCode.getScope(n);
          const property = getStaticValue(n.property, initialScope);
          if (property?.value === 1) return O.fromNullable(n.object);
          return O.none();
        })
        // const data = useState();
        // data.at(1)();
        .with({ type: NodeType.CallExpression }, (n) => {
          if (!is(NodeType.MemberExpression)(n.callee)) return O.none();
          if (!("name" in n.callee.object)) return O.none();
          const isAt = isMatching({
            type: NodeType.MemberExpression,
            property: {
              type: NodeType.Identifier,
              name: "at",
            },
          }, n.callee);
          const [index] = n.arguments;
          if (!isAt || !index) return O.none();
          const initialScope = context.sourceCode.getScope(n);
          const value = getStaticValue(index, initialScope);
          if (value?.value === 1) return O.fromNullable(n.callee.object);
          return O.none();
        })
        .otherwise(O.none);
      return O.exists(id, isFromUseStateCall);
    }
    function isThenCall(node: TSESTree.CallExpression) {
      if (node.callee.type !== NodeType.MemberExpression) return false;
      return isMatching({
        type: NodeType.Identifier,
        name: "then",
      }, node.callee.property);
    }
    function getCallKind(node: TSESTree.CallExpression) {
      return match<TSESTree.CallExpression, CallKind>(node)
        .when(isThenCall, () => "then")
        .when(isSetStateCall, () => "setState")
        .when(isUseStateCallWithAlias, () => "useState")
        .when(isUseEffectCallWithAlias, () => "useEffect")
        .otherwise(() => "other");
    }
    function getFunctionKind(node: TSESTreeFunction) {
      return match<TSESTreeFunction, FunctionKind>(node)
        .when(isEffectFunction, () => "effect")
        .when(isCleanUpFunction, () => "cleanup")
        .when(isIIFE, () => "immediate")
        .otherwise(() => "other");
    }
    const useEffectCallRef = MutRef.make<TSESTree.CallExpression | null>(null);
    const callStack = MutList.make<TSESTree.CallExpression>();
    const functionStack = MutList.make<[node: TSESTreeFunction, kind: FunctionKind]>();
    const effectFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const cleanUpFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const indirectFunctionCalls: TSESTree.CallExpression[] = [];
    const indirectSetStateCalls = new Map<TSESTreeFunction, TSESTree.CallExpression[]>();
    const onUseEffectCallEnter = (node: TSESTree.CallExpression) => void MutRef.set(useEffectCallRef, node);
    const onEffectFunctionEnter = (_: TSESTreeFunction) => {};
    const onEffectFunctionExit = (_: TSESTreeFunction) => {};
    const onUseEffectCallExit = () => void MutRef.set(useEffectCallRef, null);
    /* eslint-disable perfectionist/sort-objects */
    return {
      Identifier(node) {
        const isInUseEffectCall = MutRef.get(useEffectCallRef) !== null;
        const parentFn = MutList.tail(functionStack)?.[0];
        const useEffectCall = MutRef.get(useEffectCallRef);
        const isEffectFunction = useEffectCall && O.isSome(traverseUp(useEffectCall, n => n === parentFn));
        if (isFromUseStateCall(node) && isInUseEffectCall && isEffectFunction) {
          context.report({
            node,
            messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT",
          });
        }
      },
      CallExpression(node) {
        MutList.append(callStack, node);
        const effectFn = MutRef.get(effectFunctionRef);
        const [parentFn, parentFnKind] = MutList.tail(functionStack) ?? [];
        if (parentFn?.async) return;
        const callKind = getCallKind(node);
        match(callKind)
          .with("setState", () => {
            if (!parentFn) return;
            if (parentFn !== effectFn && parentFnKind !== "immediate") {
              indirectSetStateCalls.set(parentFn, [...indirectSetStateCalls.get(parentFn) ?? [], node]);
              return;
            }
            context.report({
              node,
              messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT",
            });
          })
          .with("useEffect", () => {
            onUseEffectCallEnter(node);
          })
          .with("other", () => {
            indirectFunctionCalls.push(node);
          })
          .otherwise(F.constVoid);
      },
      ":function"(node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        MutList.append(functionStack, [node, functionKind]);
        match(functionKind)
          .with("effect", () => {
            MutRef.set(effectFunctionRef, node);
            onEffectFunctionEnter(node);
          })
          .with("cleanup", () => {
            MutRef.set(cleanUpFunctionRef, node);
          })
          .otherwise(F.constVoid);
      },
      ":function:exit"(node: TSESTreeFunction) {
        const effectFn = MutRef.get(effectFunctionRef);
        if (effectFn === node) {
          onEffectFunctionExit(node);
          MutRef.set(effectFunctionRef, null);
        }
        MutList.pop(functionStack);
      },
      "CallExpression:exit"(node) {
        MutList.pop(callStack);
        if (MutRef.get(useEffectCallRef) === node) {
          onUseEffectCallExit();
          MutRef.set(useEffectCallRef, null);
        }
      },
      "Program:exit"() {
        for (const call of indirectFunctionCalls) {
          if (!("name" in call.callee)) continue;
          const { name } = call.callee;
          const setStateCalls = F.pipe(
            findVariable(name, context.sourceCode.getScope(call)),
            O.flatMap(getVariableInit(0)),
            O.filter(isFunction),
            O.flatMapNullable((init) => indirectSetStateCalls.get(init as TSESTreeFunction)),
            O.getOrElse(() => []),
          );
          for (const setStateCall of setStateCalls) {
            context.report({
              data: {
                name,
              },
              messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT",
              node: setStateCall,
            });
          }
        }
      },
    };
    /* eslint-enable perfectionist/sort-objects */
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
