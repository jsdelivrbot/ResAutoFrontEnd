<template>
    <v-container fluid>
        <v-card v-if="sensorLuminosidadeId" flat color="transparent" style="margin-top: 30px;">
            <v-card-title primary-title style="padding: 0;">
                <v-layout align-center column fill-height>
                    <div class="xs-12">
                        <div class="headline text-xs-center grey--text text--darken-3"
                             style="text-shadow: 1px 1px #000;">Sensor de Luminosidade
                        </div>
                    </div>
                    <div class="xs-12">
                        <div style="align-items: center; display: flex; justify-content: center">
                            <v-slider
                                    v-model="sensorLuminosidade"
                                    thumb-label
                                    max="100"
                                    min="0"
                                    @change="sensibilidadeLuminosidadeEscolhida()"
                            ></v-slider>
                        </div>
                    </div>
                </v-layout>
            </v-card-title>
        </v-card>

        <v-card v-if="sensorPresencaId" flat color="transparent" style="margin-top: 30px;">
            <v-card-title primary-title style="padding: 0;">
                <v-layout align-center column fill-height>
                    <div class="xs-12">
                        <div class="headline text-xs-center grey--text text--darken-3"
                             style="text-shadow: 1px 1px #000;">Sensor de Presença
                        </div>
                    </div>
                    <div class="xs-12">
                        <div style="align-items: center; display: flex; justify-content: center">
                            <v-switch color="green" v-model="sensorPresencaEstado"></v-switch>
                        </div>
                    </div>
                </v-layout>
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        components: {},
        data: () => ({
            sensorPresencaId: null,
            sensorPresencaEstado: false,
            sensorLuminosidadeId: null,
            sensorLuminosidade: 0,
        }),
        methods: {
            sensibilidadeLuminosidadeEscolhida() {
                const sensibilidade = Math.round(this.sensorLuminosidade/100 * 1024);
                const id = this.sensorLuminosidadeId;

                const url = this.$store.getters.backendBaseUrl + 'dispositivos/' + id + '/';
                const config = {
                    'headers': {
                        'Authorization': localStorage['authHeader'],
                    }
                };

                const body = {
                    'id': id,
                    'sensibilidade': sensibilidade,
                };

                this.$http.patch(url, body, config).then(response => {
                }, response => {
                    // error callback
                    console.log('Ops!')
                });
            },


            atualizarSensibilidadeLuminosidade(){
                const url = this.$store.getters.backendBaseUrl + 'dispositivos/?codigo=00&ordering=id';
                const config = {
                    'headers': {
                        'Authorization': localStorage['authHeader'],
                    }
                };

                this.$http.get(url, config).then(response => {
                    const sensor = response.body.length > 0 ? response.body[0] : null;

                    if (sensor){
                        const sensibilidade = sensor['sensibilidade'];
                        this.sensorLuminosidade = Math.round(sensibilidade/1024 * 100);
                        this.sensorLuminosidadeId = sensor['id'];
                    }
                }, response => {
                    // error callback
                    console.log('Ops!')
                });
            },

            atualizarSensorPresenca(){
                const url = this.$store.getters.backendBaseUrl + 'dispositivos/?codigo=10&ordering=id';
                const config = {
                    'headers': {
                        'Authorization': localStorage['authHeader'],
                    }
                };

                this.$http.get(url, config).then(response => {
                    const sensor = response.body.length > 0 ? response.body[0] : null;

                    if (sensor){
                        this.sensorPresencaEstado = sensor['estado'] === '1';
                        this.sensorPresencaId = sensor['id'];
                    }
                }, response => {
                    // error callback
                    console.log('Ops!')
                });
            }
        },
        watch: {
            sensorPresencaEstado() {
                const id = this.sensorPresencaId;
                const estado = this.sensorPresencaEstado + 0 + '';

                const url = this.$store.getters.backendBaseUrl + 'dispositivos/' + id + '/';
                const config = {
                    'headers': {
                        'Authorization': localStorage['authHeader'],
                    }
                };

                const body = {
                    'id': id,
                    'estado': estado,
                };

                this.$http.patch(url, body, config).then(response => {
                }, response => {
                    // error callback
                    console.log('Ops!')
                });
            },
        },
        created() {
            this.atualizarSensorPresenca();
            this.atualizarSensibilidadeLuminosidade();
        }
    }
</script>
