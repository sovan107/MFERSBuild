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
          singleton: false,
          version: '17.0.2',
          requiredVersion: '^17.0.2',
        },
        'react-dom': {
          singleton: false,
          version: '17.0.2',
          requiredVersion: '^17.0.2',
        },
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
