import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import pt from 'vuetify/es5/locale/pt'
import colors from 'vuetify/es5/util/colors'


Vue.use(Vuetify, {
    iconfont: 'fa',
    theme: {
        primary: colors.red.darken1,
        secondary: colors.cyan,
        accent: colors.cyan,

        background: '#FFFAFA',

        error: colors.red.lighten1,
        info: colors.lightBlue.lighten1,
        success: colors.lightGreen.darken3,
        warning: colors.yellow.darken1,
    },
    lang: {
        locales: {pt},
        current: 'pt'
    },
});
