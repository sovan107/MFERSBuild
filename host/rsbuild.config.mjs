import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      remotes: {
        child: 'child@http://localhost:3001/remoteEntry.js',
        child18: 'child18@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: false,
          version: '18.2.0',
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: false,
          version: '18.2.0', 
          requiredVersion: '^18.0.0',
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
