<template>
    <v-container fluid>
        <v-card flat color="transparent" style="margin-top: 30px;">
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

        <v-card flat color="transparent" style="margin-top: 30px;">
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
                // TODO: notificar backend alteração em sensor de luminosidade
                const sensibilidade = Math.round(this.sensorLuminosidade/100 * 1024);
                console.log('sensorLuminosidade', sensibilidade);
            }
        },
        watch: {
            sensorPresencaEstado() {
                // TODO: notificar backend alteração em sensor de presença
                console.log('sensorPresencaEstado', this.sensorPresencaEstado);
            },
        },
        mounted() {
            // TODO: alterar sensor de presença e luminosidade de acordo com backend
            this.sensorPresencaEstado = false;
            const sensibilidade = 0;
            this.sensorLuminosidade = Math.round(sensibilidade/1024 * 100);
        }
    }
</script>
