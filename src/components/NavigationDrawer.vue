<template>
    <v-navigation-drawer
            fixed
            clipped
            app
            v-model="drawerMostrar"
            class="background">
        <v-list
                dense
                color="background">
            <template v-for="item in drawerItens">
                <v-layout
                        row
                        v-if="item.cabecalho"
                        align-center
                        :key="item.cabecalho">
                    <v-flex xs6>
                        <v-subheader v-if="item.cabecalho">
                            {{ item.cabecalho }}
                        </v-subheader>
                    </v-flex>
                </v-layout>
                <v-divider v-else-if="item.divisor"></v-divider>
                <v-list-group
                        v-else-if="item.filhos"
                        v-model="item.model"
                        append-icon=""
                        :key="item.texto"
                        :prepend-icon="item.model ? item.icone : item.iconeAlternativo">
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.texto"/>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile
                            v-for="filho in item.filhos"
                            :key="filho.texto"
                            :disabled="filho.desabilitar"
                            @click="onClickItemMenu(filho)">
                        <v-list-tile-action v-if="filho.icone">
                            <v-icon>{{ filho.icone }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="filho.texto"/>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
                <v-list-tile
                        v-else
                        :disabled="item.desabilitar"
                        :key="item.texto"
                        @click="onClickItemMenu(item)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icone }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.texto }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

    import store from '../store';


    export default {
        name: 'drawer',
        store: store,
        data: () => ({
            drawerItens: [
                {cabecalho: 'ResAuto'},
                {icone: 'fas fa-home', texto: 'Home', rota: {name: 'home'}, desabilitar: false},
                {icone: 'fas fa-cog', texto: 'Configurações', rota: {name: 'home'}, desabilitar: true},
                {divisor: true},
                {icone: 'fas fa-sign-out-alt', texto: 'Sair', id: 'sair', desabilitar: false, action: 'logout'},
            ],
        }),

        computed: {
            drawerMostrar: {
                set(drawerMostrar) {
                    this.$store.commit('drawerMostrar', drawerMostrar);
                },
                get() {
                    return this.$store.getters.drawerMostrar || this.$vuetify.breakpoint.width >= this.$store.getters.drawerBreakpointEmTelaGrande;
                }
            }
        },

        methods: {
            logout() {
                this.drawerMostrar = false;
                // TODO: Ação logout
            },

            onClickItemMenu(item) {
                if (item.desabilitar) {
                    return
                }

                if (item['action']) {
                    this[item.action]();
                }

                if (item['rota']) {

                    this.drawerMostrar = false;

                    if (item.rota.name) {
                        this.$router.push({'name': item.rota.name});
                    } else if (item.rota.path && item.rota.urlparam) {
                        this.$router.push({path: `/${item.rota.path}/${item.rota.urlparam}`});
                    }

                }
            }
        },

    };
</script>

<style scoped>

</style>