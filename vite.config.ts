import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import TypeCheck from 'vite-plugin-checker';

export default ({ mode }) => {
  return defineConfig({
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes(''))
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString();
            }
          },
        },
      },
    },
    css: {
      modules: {
        generateScopedName: '[folder]__[local]__[hash:base64:5]',
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: { host: true, open: true, port: 3000 },
    plugins: [
      react(),
      TypeCheck({
        typescript: true,
        enableBuild: true,
        overlay: {
          initialIsOpen: false,
          position: 'tr',
        },
        terminal: true,
        eslint: {
          lintCommand: 'eslint "./**/*.{ts,tsx}"',
          dev: {
            logLevel: ['error'],
          },
        },
      }),
    ],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    preview: {
      port: 3000,
    },
  });
};
