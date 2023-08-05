import { defineConfig } from 'father';
import * as path from "path";
const resolve = dir => path.resolve(__dirname, dir);
export default defineConfig({
  alias:{
    "@alkaid/core": resolve("../../packages/core"),
    "@alkaid/formily-setters": resolve("../setters")
  },
  esm: { output: 'dist' },
});
