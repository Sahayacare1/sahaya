import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      /**
       * Every photo in this project is a pre-optimised WebP in /public,
       * exported at a single size. `next/image` would proxy each one
       * without gaining any responsive variants, while adding a runtime
       * hop and getting in the way of the direct style/ref control that
       * the Ken Burns, parallax and clip-path reveals depend on.
       *
       * These images do carry the accessibility and performance work
       * that matters: explicit `alt`, `loading="lazy"` below the fold,
       * `decoding="async"`, and `sizes` on the larger art.
       *
       * If the artwork is ever re-exported at multiple widths, switch
       * these to `next/image` and remove this override.
       */
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
