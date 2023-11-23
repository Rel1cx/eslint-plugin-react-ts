export type RuleCategory =
  | "complexity" // Rules to indicate code that does something simple but in a complex way or help prevent complex code
  | "correctness" // Rules to indicate code that is outright wrong or useless
  | "debug" // Rules to help debug code (e.g. debug-function-component)
  | "deprecated" // Rules that already deprecated and should not be used
  | "nursery" // New rules that are still under development
  | "pedantic" // Rules which are rather strict or might have false positives
  | "perf" // Rules to indicate performance issues (e.g. no-constructed-context-value)
  | "restriction" // Rules that apply additional restrictions on the code (e.g. ban-html-props, ban-svg-props)
  | "security" // Rules to indicate security issues (e.g. no-missing-iframe-sandbox)
  | "style" // Rules that enforce a specific style (e.g. prefer-shorthand-boolean, prefer-shorthand-fragment) (not code formatting like wrap or indent)
  | "suspicious" // Rules that help prevent suspicious code that is most likely wrong or useless
  | "verbose"; // Rules to warn verbose information
