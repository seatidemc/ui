import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/main.less';
import * as mdijs from '@mdi/js';

// @ts-ignore
import mdiVue from 'mdi-vue/v2';

import vuetify from './plugins/vuetify';
import { checkLogin, getToken, getTokenUsername, post } from './sn';

Vue.use(mdiVue, {
	icons: mdijs
});
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
	if (to.meta) {
		if (to.meta.authRequired === true) {
			let token = getToken();
			let username = getTokenUsername();
			if (!!!token) {
				next('/auth');
			}

			checkLogin(username, token)
				.then(() => next())
				.catch(e => next('/auth'));
		} else {
			next();
		}
	} else {
		next();
	}
});

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app');
