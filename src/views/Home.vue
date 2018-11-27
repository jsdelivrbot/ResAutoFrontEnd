<template>
    <v-container fluid>
        <template v-for="lampada, index in lampadas">
            <lampada :dispositivo="lampada" :pseudoid="index +1"></lampada>
        </template>
    </v-container>
</template>

<script>

    import Lampada from '../components/Lampada'

    export default {
        components: {Lampada},
        data: () => ({
            lampadas: []
        }),
        methods: {

            atualizarLampadas() {
                const url = this.$store.getters.backendBaseUrl + 'dispositivos/?codigo=11&ordering=id';
                const config = {
                    'headers': {
                        'Authorization': localStorage['authHeader'],
                    }
                };
                this.$http.get(url, config).then(response => {
                    const lampadas = response.body;

                    // Mapear variáveis
                    for (let i = 0; i < lampadas.length; i++) {
                        lampadas[i]['estado'] = lampadas[i]['estado'] === '1';
                    }
                    this.lampadas = lampadas;
                }, response => {
                    // error callback
                    console.log('Ops!')
                });
            },
        },
        created() {
            this.atualizarLampadas();
        }
    }
</script>
