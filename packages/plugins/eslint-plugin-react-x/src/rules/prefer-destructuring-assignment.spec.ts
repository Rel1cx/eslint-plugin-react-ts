import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-destructuring-assignment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
        const App = (props) => {
            const { h, i } = hi
            return <div id={props.id} className={props.className} />
          }
      `,
      errors: [
        {
          messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
        },
        {
          messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
        },
      ],
    },
    {
      code: dedent`
        function App(props) {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
        },
        {
          messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
        },
      ],
    },
    {
      code: dedent`
        import { forwardRef } from "react";

        interface Props {
            day: string;
        }

        // Code to expect error
        export const App = forwardRef<HTMLDivElement, Props>(
            function App(props, ref) {
              return <div ref={ref}>{props.day}</div>;
            }
        );
      `,
      errors: [
        {
          messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
        },
      ],
    },
    {
      code: dedent`
        import { memo } from "react";

        interface Props {
            day: string;
        }

        // Code to expect error
        export const App = memo(
            function App(props: Props) {
                return <div ref={ref}>{props.day}</div>;
            }
        );
      `,
      errors: [
        {
          messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
        },
      ],
    },
    {
      code: dedent`
        import { memo, forwardRef } from "react";

        interface Props {
            day: string;
        }

        // Code to expect error
        export const App = memo(
            forwardRef<HTMLDivElement, Props>(
                function App(props, ref) {
                    return <div ref={ref}>{props.day}</div>;
                }
            )
        );
      `,
      errors: [
        {
          messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    dedent`
        export function hof(namespace) {
          const initialState = {
              bounds: null,
              search: false
          }
          return ({ x, y }) => {
              if (y) {
                  return <span>{y}</span>;
              }
              return <span>{x}</span>
          }
      }
    `,
    dedent`
      export function hof(namespace) {
          const initialState = {
              bounds: null,
              search: false
          }
          return (state = initialState, action) => {
              if (action.type === 'ABC') {
                  return {...state, bounds: stuff ? action.x : null}
              }
              if (action.namespace !== namespace) {
                  return state
              }
              return null
          }
      }
    `,
    "const App = ({ id, className }) => (<div id={id} className={className} />)",
    dedent`
      const App = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    dedent`
      const App = ({ id, className }) => {
          return <div id={id} className={className} /> }
    `,
    "const App = (props) => (<div id={id} props={props} />)",
    "const Component = (props) => (<div id={id} props={props} />)",
    "const App = (props, { color }) => (<div id={id} props={props} color={color} />)",
    "const Component = (props, { color }) => (<div id={id} props={props} color={color} />)",
    dedent`
      const div = styled.div\`
      & .button {
          border-radius: \${props => props.borderRadius}px;
      }
      \`
    `,
    dedent`
      export default (context: $Context) => ({
          foo: context.bar
      })
    `,
    dedent`
      function App({ context }) {
          const d = context.describe()
          return <div>{d}</div>
      }
    `,
    dedent`
      const obj = {
          foo(arg) {
              const a = arg.func()
              return null
          }
      }
    `,
    dedent`
      const columns = [
          {
              render: (val) => {
                  if (val.url) {
                      return (
                          <a href={val.url}>
                          {val.test}
                          </a>
                          )
                      }
                      return null
                  }
              }
          ]
    `,
    dedent`
      const columns = [
          {
              render: val => <span>{val}</span>
          },
          {
              someRenderFunc: function(val) {
                  if (val.url) {
                      return (
                          <a href={val.url}>
                          {val.test}
                          </a>
                          )
                      }
                      return null
                  }
              }
          ]
    `,
    dedent`
      export default (fileName) => {
          const match = fileName.match(/some expression/)
          if (match) {
              return fn
          }
          return null
      }
    `,
    dedent`
      import { useContext } from 'react'
      const App = (props) => {
          const {foo} = useContext(aContext)
          return <div>{foo}</div>
      }
    `,
    dedent`
      import { useContext } from 'react'
      import dedent from 'dedent'
      const App = (props) => {
          const foo = useContext(aContext)
          return <div>{foo.test}</div>
      }
    `,
    dedent`
      import { useContext } from 'react'
      const App = (props) => {
          const foo = useContext(aContext)
          return <div>{foo?.test}</div>
      }
    `,
    dedent`
      import { forwardRef } from "react";

      interface Props {
          day: string;
      }

      // Correct code
      export const App = forwardRef<HTMLDivElement, Props>(
          function App({ day }, ref) {
            return <div ref={ref}>{day}</div>;
          }
      );
    `,
    dedent`
      import { memo } from "react";

      interface Props {
          day: string;
      }

      // Correct code
      export const App = memo(
          function App({ day }) {
            return <div ref={ref}>{day}</div>;
          }
      );
    `,
    dedent`
      import { memo, forwardRef } from "react";

      interface Props {
          day: string;
      }

      // Correct code
      export const App = memo(
          forwardRef<HTMLDivElement, Props>(
              function App({ day }, ref) {
                  return <div ref={ref}>{day}</div>;
              }
          )
      );
    `,
    dedent`
      import { useContext } from 'react'
      const App = (props) => {
          const foo = useContext(aContext)
          return <div>{foo.test}</div>
      }
    `,
    dedent`
      export const DeleteRangeUndoMutationFactory = (
          accessor: IAccessor,
          params: IDeleteRangeMutationParams
      ): Nullable<IInsertRangeMutationParams> => {
          const univerInstanceService = accessor.get(IUniverInstanceService);
          const target = getSheetMutationTarget(univerInstanceService, params);
          if (!target) return null;

          const { worksheet } = target;
          const cellMatrix = worksheet.getCellMatrix();
          const undoData = new ObjectMatrix<ICellData>();
          const lastEndRow = worksheet.getConfig().rowCount;
          const lastEndColumn = worksheet.getConfig().columnCount;

          const { startRow, endRow, startColumn, endColumn } = params.range;
          if (params.shiftDimension === Dimension.ROWS) {
              // build new data
              for (let r = startRow; r <= lastEndRow; r++) {
                  for (let c = startColumn; c <= endColumn; c++) {
                      // store old value
                      if (r <= endRow) {
                          const cell: Nullable<ICellData> = cellMatrix.getValue(r, c);
                          undoData.setValue(r, c, cell as ICellData);
                      }
                  }
              }
          } else if (params.shiftDimension === Dimension.COLUMNS) {
              // build new data
              for (let r = startRow; r <= endRow; r++) {
                  for (let c = startColumn; c <= lastEndColumn; c++) {
                      // store old value
                      if (c <= endColumn) {
                          const cell: Nullable<ICellData> = cellMatrix.getValue(r, c);
                          undoData.setValue(r, c, cell as ICellData);
                      } else {
                          for (let i = 0; i <= endColumn; i++) {
                              const cell: Nullable<ICellData> = cellMatrix.getValue(r, c);
                              undoData.setValue(r, c + i, cell as ICellData);
                          }
                      }
                  }
              }
          }

          return {
              ...Tools.deepClone(params),
              cellValue: undoData.getData(),
          };
      };
    `,
  ],
});
