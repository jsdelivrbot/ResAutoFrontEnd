import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
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
            ],
        },
    ]
});

router.beforeEach((to, from, next) => {
    // TODO: detectar se o usuário está logado
    let logged = true;

    let authPage = to.matched.some(record => record.meta.authPage);
    let anonymousAccess = to.matched.some(record => record.meta.anonymousAccess);

    if (anonymousAccess) next();
    else if (!authPage && !logged) next('login');
    else if (authPage && logged) next('home');
    else next()
});

export default router