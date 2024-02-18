import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import copy from "rollup-plugin-copy";

export default {
	input: 'src/main.js',
	output: {
		file: `../extensions/${process.env.EXTENSION || ""}/assets/index.js`,
		format: 'cjs',
        plugins: [terser()]
	},
	plugins: [
        css({ output: "style.css" }), 
        copy({
            targets: [{
                    src: "src/liquid/*.liquid",
                    dest: `../extensions/${process.env.EXTENSION || ""}/blocks`
                },
                {
                    src: ["public/*.png", "public/*.jpg"],
                    dest: `../extensions/${process.env.EXTENSION || ""}/assets`
                }
            ]
        })
    ]
};