import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-use-memo";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useMemo } from "react";

        const Comp = () => {
          const style = useMemo((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useMemo } from "react";

        const deps = [];
        const Comp = () => {
          const style = useMemo((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), deps);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useMemo } from "react";

        const Comp = () => {
          const deps = [];
          const style = useMemo((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), deps);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useMemo } from "react";

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 2, 1].sort(), []);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        const { useMemo } = require("react");

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 2, 1].sort(), []);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import React from "react";

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import React from "roact";

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        import Roact from "roact";

        function App({ items }) {
          const memoizedValue = Roact.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        import { useMemo } from "roact";

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        import Pika from "@pika/react";

        function App({ items }) {
          const memoizedValue = Pika.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        import { useMemo } from "@pika/react";

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("roact");

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        const Roact = require("roact");

        function App({ items }) {
          const memoizedValue = Roact.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        const { useMemo } = require("roact");

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        const Pika = require("@pika/react");

        function App({ items }) {
          const memoizedValue = Pika.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        const { useMemo } = require("@pika/react");

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "react";

        function App({ items }) {
          const memoizedValue = useCustomMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useMemo: ["useCustomMemo"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useState, useMemo } from "react";

        function MyComponent() {
          const handleSnapshot = useMemo(() => () => console.log(true), []);

          return null;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useState, useMemo } from "react";

        function MyComponent() {
          const handleSnapshot = useMemo(() => () => () => console.log(true), []);

          return null;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    /* tsx */ `
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    /* tsx */ `
      const useData = (key) => useSWR(key);
    `,
    /* tsx */ `
      const onClick = () => {
        console.log("clicked");
      };

      const Comp = () => {
        return <Button onClick={onClick} />;
      };
    `,
    /* tsx */ `
      import { useMemo } from "react";

      function App({ items }) {
        const memoizedValue = useMemo(() => [...items].sort(), [items]);
        return <div>{count}</div>;
      }
    `,
    /* tsx */ `
      import { useMemo } from "react";

      const Comp = () => {
      const [width, setWidth] = useState<undefined | number>(undefined)
              const [open, setOpen] = useState<boolean>(false)
              const [title, setTitle] = useState<string | undefined>(undefined)

              const refItem = useMemo(() => {
                  return {
                      setWidth,
                      setWrap: setOpen,
                      setWrapperName: setTitle,
                  }
              }, [])
      };
    `,
    /* tsx */ `
      import { useMemo } from "react";
      const deps = []
      const Comp = () => {
      const [width, setWidth] = useState<undefined | number>(undefined)
              const [open, setOpen] = useState<boolean>(false)
              const [title, setTitle] = useState<string | undefined>(undefined)
              const cb = () => {
                  return {
                      setWidth,
                      setWrap: setOpen,
                      setWrapperName: setTitle,
                  }
              }
              const refItem = useMemo(cb, deps)
      };
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => {
          return () => setShowSnapshot(true)
        }, []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => () => setShowSnapshot(true), []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => () => () => setShowSnapshot(true), []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const a = 1;
        const handleSnapshot = useMemo(() => () => () => console.log(a), []);

        return null;
      }
    `,
  ],
});
