import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/main.less';
import * as mdijs from '@mdi/js';

// @ts-ignore
import mdiVue from 'mdi-vue/v2';
import VueCookies from 'vue-cookies';
import nprogress from 'nprogress';
import vuetify from './plugins/vuetify';
import { checkAdmin, checkLogin, getToken, getTokenUsername, post } from './fn';

Vue.prototype.$open = (url: string) => {
	window.open(url);
};

nprogress.configure({
	showSpinner: false
})
Vue.use(VueCookies);
Vue.use(mdiVue, {
	icons: mdijs
});
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
	nprogress.start();
	checkAdmin().then(r => {
		Vue.prototype.$isAdmin = r;
	});
	if (to.meta) {
		if (to.meta.authRequired === true) {
			let token = getToken();
			let username = getTokenUsername();
			if (!!!token) {
				nprogress.done();
				next('/auth');
			}

			checkLogin(username, token)
				.then(() => next())
				.catch(e => {
					nprogress.done();
					next('/auth');
				});
		} else {
			next();
		}
	} else {
		next();
	}
});

router.afterEach((to, from) => {
	nprogress.done();
});
Vue.prototype.$isAdmin = false;
Vue.prototype.$open = (url: string) => {
	window.open(url);
};

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app');
