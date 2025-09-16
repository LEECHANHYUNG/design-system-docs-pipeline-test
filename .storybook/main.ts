import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

import { resolve, basename } from "path";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../packages/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },

  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {},
    },
  },
  viteFinal: async (config) => {
    // Customize the Vite config here
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "~": resolve(__dirname, "../packages/ui/src"),
        },
      },
      plugins: [
        ...(config.plugins || []),
        vanillaExtractPlugin({
          identifiers: ({ hash, filePath, debugId }) => {
            const componentName = basename(filePath, ".css.ts");
            const prefix = componentName === "sprinkles" ? "v" : componentName;

            return `${prefix}${debugId ? `-${debugId}` : ""}-${hash}`;
          },
        }),
      ],
      server: {
        ...config.server,
        fs: {
          strict: false,
          allow: ['..']
        },
        origin: 'http://localhost:6006',
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        force: true,
      },
    };
  },
};
export default config;
