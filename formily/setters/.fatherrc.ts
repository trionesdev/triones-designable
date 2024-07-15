import { defineConfig } from 'father';
import * as path from 'path';
const resolve = (dir) => path.resolve(__dirname, dir);
export default defineConfig({
  alias: {},
  esm: { output: 'dist' },
});
