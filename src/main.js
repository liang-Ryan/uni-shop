// request
import uni from "./utils/request";

// pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// app
import { createSSRApp } from "vue";
import App from "./App.vue";

export function createApp() {

	const app = createSSRApp(App);
	app.use(uni)
	app.use(createPinia().use(piniaPluginPersistedstate))

	return {
		app,
	};
}
