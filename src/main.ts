import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { QueuePlugin } from './plugins/ProcessQueue';
import { i18n } from './assets/i18n/i18n-setup';

import AppHeader from './components/header/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import AppTip from './components/AppTip.vue';

Vue.use(QueuePlugin);

Vue.config.productionTip = false;
Vue.component('app-header', AppHeader);
Vue.component('app-sidebar', AppSidebar);
Vue.component('app-tip', AppTip);

const vm = new Vue({
    router,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
