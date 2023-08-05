import { defineConfig } from 'father';
import * as path from "path";
const resolve = dir => path.resolve(__dirname, dir);
export default defineConfig({
  alias:{
    "@alkaid/react-settings-form": resolve("../../packages/react-settings-form")
  },
  esm: { output: 'dist' },
});
