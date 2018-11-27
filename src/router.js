import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import Home from './views/Home'
import Settings from './views/Settings'
import Estrutura from './views/Estrutura'
import Login from './views/Login'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/login',
            meta: {
                authPage: true
            }
        },
        {
            path: '/',
            redirect: '/login',
            meta: {
                authPage: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                authPage: true
            }
        },
        {
            path: '',
            name: 'estrutura',
            component: Estrutura,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                },
                {
                    path: '/configuracoes',
                    name: 'settings',
                    component: Settings,
                },
            ],
        },
    ]
});

router.beforeEach((to, from, next) => {
    let logged = store.getters.userLogado;

    let authPage = to.matched.some(record => record.meta.authPage);
    let anonymousAccess = to.matched.some(record => record.meta.anonymousAccess);

    if (anonymousAccess) next();
    else if (!authPage && !logged) next('login');
    else if (authPage && logged) next('home');
    else next()
});

export default router