import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  resolve: {
    alias: {
      '@': _resolve('lib'),
    },
  },
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'ext-common',
      fileName: 'ext-common',
    },
  },
});

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}
