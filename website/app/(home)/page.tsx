import { Link } from "next-view-transitions";

import { ESLintReact } from "#/components/eslint-react";

const features = [
  ["Flexible", "Increased flexibility with more granular severity control."],
  ["Comprehensive", "First-class support for TypeScript, React 19, polymorphic components."],
  ["Advanced Analysis", "Handles complex scenarios and identifies problems that other tools might miss."],
] as const;

const packages = [
  ["eslint-plugin-react-x", "Core rules (renderer-agnostic, compatible with x-platform)."],
  ["eslint-plugin-react-dom", "DOM specific rules for React DOM."],
  ["eslint-plugin-react-web-api", "Rules for interacting with Web APIs."],
  ["eslint-plugin-react-hooks-extra", "Extra React Hooks rules."],
  ["eslint-plugin-react-naming-convention", "Naming convention rules."],
] as const;

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-12 md:px-12 mx-auto">
      <ESLintReact />
      <article className="prose max-w-none">
        <p>More than 80 high-quality linting rules for writing better React code.</p>
        <h2>Features</h2>
        <ul>
          {features.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>: {description}
            </li>
          ))}
        </ul>
        <h2>ESLint Plugins</h2>
        <h3>All-in-one</h3>
        <ul>
          <li>
            <span>
              <Link href="https://www.npmjs.com/package/@eslint-react/eslint-plugin">
                @eslint-react/eslint-plugin
              </Link>{" "}
              - The main ESLint plugin package including all rules and config presets in this repository.
            </span>
          </li>
        </ul>
        <h3>Modular</h3>
        <ul>
          {packages.map(([name, description]) => (
            <li key={name}>
              <span>
                <Link href={`https://www.npmjs.com/package/${name}`}>
                  {name}
                </Link>{" "}
                - {description}
              </span>
            </li>
          ))}
        </ul>
        <h2>FAQ</h2>
        <Link href="/docs/faq">Frequently Asked Questions ↗</Link>
        <h2>License</h2>
        This project is licensed under the MIT License - see the{" "}
        <a href="https://github.com/Rel1cx/eslint-react/blob/main/LICENSE">LICENSE</a> file for details.
      </article>
    </main>
  );
}
