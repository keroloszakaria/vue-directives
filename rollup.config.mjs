import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';

function copyRuntimePlugin() {
  return {
    name: 'copy-runtime-plugin',
    buildEnd() {
      mkdirSync('dist/runtime', { recursive: true });
      const content = readFileSync('src/runtime/plugin.ts', 'utf-8');
      writeFileSync('dist/runtime/plugin.mjs', content
        .replace(/from ['"]#app['"]/, "from '#app'")
        .replace(/from ['"]\.\.\/plugin['"]/, "from '../index.esm.js'")
      );
    },
  };
}

export default [
  // ESM + CJS builds
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    external: ['vue'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
  // Nuxt module build
  {
    input: 'src/nuxt.ts',
    output: [
      {
        file: 'dist/nuxt.mjs',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/nuxt.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    external: ['vue', '@nuxt/kit', /node_modules/],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
      }),
      copyRuntimePlugin(),
    ],
  },
  // Type declarations
  {
    input: 'dist/types/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];
