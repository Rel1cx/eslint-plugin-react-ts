import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-leaked-conditional-rendering";
const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
        const foo = Math.random() > 0.5;
        const bar = "bar";

        const App = () => {
          return <div>{foo || bar}</div>
      }
    `,
    dedent`
        type AppProps = {
          foo: string;
        }

        const App = ({ foo }: AppProps) => {
          return <div>{foo}</div>
      }
    `,
    dedent`
        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>There are {items.length} elements</div>
      }
    `,
    dedent`
        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{!count && 'No results found'}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{!!itesm.length && <List items={items}/>}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{Boolean(items.length) && <List items={items}/>}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{items.length > 0 && <List items={items}/>}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{items.length ? <List items={items}/> : null}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{count ? <List items={items}/> : null}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{!!count && <List items={items}/>}</div>
      }
    `,
    dedent`
      type AppProps = {
        items: string[];
        count: number;
      }

      const App = ({ items, count }: AppProps) => {
          return <div>{direction ? (direction === "down" ? "▼" : "▲") : ""}</div>
      }
    `,
    dedent`
      const App = () => {
        return (
            <>
            {0 ? <Foo /> : null}
            {'' && <Foo />}
            {NaN ? <Foo /> : null}
            </>
            )
        }
    `,
    dedent`
      const foo = Math.random() > 0.5;
      const bar = 0;
      function App() {
        return (
          <button
            type="button"
            disabled={foo && bar === 0}
            onClick={() => {}}
          />
        );
      }
    `,
    `
      const someCondition = JSON.parse("true") as boolean;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
      `,
    dedent`
      const someCondition = JSON.parse("") as any;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const someCondition = JSON.parse("") as unknown;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const someCondition = 0
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const someCondition = 1
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const someCondition = 0;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition
              ? (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />)
              : someCondition ? null : <div />
            }
          </>
        )
      }
    `,
    dedent`
      const SomeComponent = () => <div />;
      const App = ({
        someCondition,
      }: {
        someCondition?: number | undefined;
      }) => {
        return (
          <>
            {someCondition
              ? someCondition
              : <SomeComponent />
            }
          </>
        )
      }
    `,
    dedent`
      const someCondition = 0;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition
              ? (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />)
              : someCondition ? Date()
              : someCondition && someCondition
              ? <div />
              : null
            }
          </>
        )
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        const App = () => {
          return (
              <>
              {0 && <Foo />}
              {NaN && <Foo />}
              </>
              )
          }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = JSON.parse("") as any;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {someCondition && (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />
              )}
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = JSON.parse("") as unknown;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {someCondition && (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />
              )}
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 0
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {someCondition && (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />
              )}
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 1
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {someCondition && (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />
              )}
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition1 = true
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : Date()
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition1 = true
        const SomeComponent = () => <div />;
        const notComponent = () => new Date();

        const App = () => {
          return (
            <>
              {someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : notComponent()
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : Date()
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition && <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 1;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? Date() : <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const App = ({
          someCondition,
        }: {
          someCondition: number | undefined;
        }) => {
          return (
            <>
              {someCondition && <Foo />}
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 1;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? window
                : someCondition && someCondition
                ? <div />
                : null
              }
            </>
          )
        }
      `,
      errors: [
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
      ],
    },
  ],
});
