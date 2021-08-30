import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/main.less';
import * as mdijs from '@mdi/js';

// @ts-ignore
import mdiVue from 'mdi-vue/v2';

import vuetify from './plugins/vuetify'

Vue.use(mdiVue, {
	icons: mdijs
});
Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
