import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  {
    input: './tmp/index.js',
    output: {
      name: 'typescript-schema-transformer',
      file: pkg.unpkg,
      format: 'umd',
    },
    plugins: [resolve(), commonjs(), terser(), filesize()],
  },
  {
    input: './tmp/index.js',
    output: [
      { file: pkg.module, format: 'es' },
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [resolve(), filesize()],
  },
];
