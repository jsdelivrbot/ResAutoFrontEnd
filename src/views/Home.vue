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
            lampadas: [
                {
                    id: 122,
                    versao: 1,
                    codigo: 11,
                    estado: 0,
                    leitura_valor: null,
                    leitura_unidade: "",
                    sensibilidade: null,
                },
                {
                    id: 213,
                    versao: 1,
                    codigo: 11,
                    estado: 1,
                    leitura_valor: null,
                    leitura_unidade: "",
                    sensibilidade: null,
                }
            ]
        }),
    }
</script>
