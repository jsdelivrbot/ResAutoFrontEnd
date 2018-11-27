import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
