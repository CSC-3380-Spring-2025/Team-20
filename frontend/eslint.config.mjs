import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // ✅ Add this block to override specific rules
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-namespace": "off"
    },
  },
<<<<<<< HEAD
];
=======
];
>>>>>>> lily-cam
