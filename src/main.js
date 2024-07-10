// request
import uni from "./utils/request";

// app
import { createSSRApp } from "vue";
import App from "./App.vue";

export function createApp() {

	const app = createSSRApp(App);
	app.use(uni)

	return {
		app,
	};
}
