import VueImageZoomer from './components/VueImageZoomer.vue'
export default {
	install: (app, options) => {
		app.component("VueImageZoomer", VueImageZoomer);
	},
}
export { default as VueImageZoomer } from "./components/VueImageZoomer.vue";