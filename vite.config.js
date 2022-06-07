import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: "/src/index.js",
			name: "vue-image-zoomer",
			filename: (format) => `${format}.js`
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "vue"					
				},
				exports: "named"
			}
		}
	},
  	plugins: [vue()]
});
