import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'child',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: false,
        },
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
