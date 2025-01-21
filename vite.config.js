import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  	plugins: [vue()],
  	build: {
	    lib: {
	      	entry: 'src/index.js',
	      	name: 'VueImageZoomer',
	      	formats: ['es', 'umd'],	      	
	    },
	    rollupOptions: {
	      	external: ['vue'],
	      	output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name.endsWith('.css')) {
					  return 'style.css'
					}
					return assetInfo.name
				},
	        	globals: {
	          		vue: 'Vue',
	        	},
	        	exports: 'named', // Ensure this is set to 'named'
	      	},
	    },
  	},
});
