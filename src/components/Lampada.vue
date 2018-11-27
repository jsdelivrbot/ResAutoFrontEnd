<template>
    <v-container fluid>
        <v-card flat color="transparent">
            <v-card-title primary-title>
                <v-layout align-center justify-space-around row fill-height>
                    <div class="xs-6">
                        <div class="headline grey--text text--darken-3" style="text-shadow: 1px 1px #000;">Lâmpada
                            {{pseudoid}}
                        </div>
                    </div>
                    <div class="xs-6">
                        <div style="align-items: center; display: flex; justify-content: center">
                            <v-switch color="blue" v-model="estado"></v-switch>
                        </div>
                    </div>
                </v-layout>
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Lampada",
        props: ['dispositivo', 'pseudoid'],
        data: () => ({
            estado: false,
        }),
        mounted() {
            this.estado = this.dispositivo.estado;
        },
        watch: {
            estado() {
                // TODO: alterar estado lampada no backend
                const id = this.dispositivo.id;
                const estado = this.estado;
            },
        }

    }
</script>

<style scoped>

</style>