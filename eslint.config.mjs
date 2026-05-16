import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * FSD layer dependency rules — enforced via no-restricted-imports.
 * Direction: app → widgets → features → entities → shared
 * Cross-imports between siblings (e.g. one feature importing another) are also forbidden.
 */
const fsdLayers = {
  shared: { forbidden: ["app", "widgets", "features", "entities"] },
  entities: {
    forbidden: ["app", "widgets", "features"],
    forbiddenSibling: "entities",
  },
  features: {
    forbidden: ["app", "widgets"],
    forbiddenSibling: "features",
  },
  widgets: { forbiddenSibling: "widgets" },
};

const buildPatterns = (forbiddenLayers = [], forbiddenSibling) => {
  const patterns = forbiddenLayers.flatMap((layer) => [
    `@/${layer}`,
    `@/${layer}/*`,
    `**/${layer}/*`,
  ]);
  if (forbiddenSibling) {
    patterns.push(`@/${forbiddenSibling}/*/*`);
  }
  return patterns;
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "import/order": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: buildPatterns(fsdLayers.shared.forbidden),
        },
      ],
    },
  },
  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: buildPatterns(
            fsdLayers.entities.forbidden,
            fsdLayers.entities.forbiddenSibling,
          ),
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: buildPatterns(
            fsdLayers.features.forbidden,
            fsdLayers.features.forbiddenSibling,
          ),
        },
      ],
    },
  },
  {
    files: ["src/widgets/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: buildPatterns([], fsdLayers.widgets.forbiddenSibling),
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
