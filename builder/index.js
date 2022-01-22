const rollup = require('rollup');
const path = require('path');
const { getBabelOutputPlugin, getBabelInputPlugin, babel } = require('@rollup/plugin-babel');
const dts = require('rollup-plugin-dts').default;

const inputOptions = {
    input: path.resolve(__dirname, '../src/index.ts'),
    plugins: [
        babel(
            {
                // exclude: 'node_modules/**',
                // extensions:['.js', '.ts'],
            }
        ),
        dts(),
        
    ]
};
const outputOptions = {
    file: path.resolve(__dirname, '../lib/mdata.cjs3.js'),
    name: 'Test',
    format: 'umd',
}

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);

    console.log(code)

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

build();