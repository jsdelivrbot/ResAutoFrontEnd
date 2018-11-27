<template>
    <v-container fluid>
        <v-layout align-center justify-center fill-height>
            <v-card>
                <v-container fluid>
                    <v-layout align-center justify-space-around column fill-height>
                        <v-flex xs12 style="margin-top: 10px;">
                            <!-- Logo -->
                            <h5 class="headline text-xs-center">ResAuto</h5>
                            <!-- User -->
                            <v-text-field
                                    v-model="user"
                                    type="text"
                                    name="user"
                                    placeholder="Usuário"
                                    prepend-icon="fas fa-user"
                                    required
                                    ref="user"
                                    :rules="userRules"
                            ></v-text-field>
                            <!-- Senha -->
                            <v-text-field
                                    v-model="password"
                                    name="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Senha"
                                    prepend-icon="fas fa-key"
                                    :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                    @click:append="showPassword = !showPassword"
                                    required
                                    ref="password"
                                    :rules="passwordRules"
                            ></v-text-field>
                            <br>
                            <v-btn round block color="primary" dark v-on:click="signIn">Login</v-btn>
                            <br>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>

    import store from '../store';

    export default {
        name: 'Login',
        store: store,
        data: function () {
            return {
                user: '',
                password: '',
                showPassword: false,
                formHasErrors: false,
                rules: {
                    userMatch: () => ('O usuário e senha não combinam'),
                    required: () => ('Valor requerido!')
                },
                userRules: [],
                passwordRules: [],
            }
        },

        watch: {
            password() {
                this.passwordRules = [];
            },
            user() {
                this.userRules = [];
            },
        },

        methods: {
            signIn: function () {

                this.formHasErrors = false;
                const self = this;

                Object.keys(this.form).forEach(f => {
                    if (!this.form[f]) this.formHasErrors = true;
                });

                if (!this.formHasErrors) {
                    const userpass = this.user + ':' + this.password;
                    const authheader = "Basic " + btoa(userpass);
                    this.$store.commit('authHeader', authheader);
                    const url = this.$store.getters.backendBaseUrl;
                    const config = {
                        'headers': {
                            'Authorization': authheader,
                        }
                    };
                    this.$http.get(url, config).then(response => {
                        this.$store.commit('userLogado', true);
                        this.$router.push({'name': 'home'});
                    }, response => {
                        // error callback
                        this.userRules = [this.rules.userMatch];
                        this.passwordRules = [this.rules.userMatch];
                        Object.keys(this.form).forEach(f => {
                            this.$refs[f].validate(true)
                        });
                    });
                } else {
                    this.userRules = [this.rules.required];
                    this.passwordRules = [this.rules.required];
                    Object.keys(this.form).forEach(f => {
                        this.$refs[f].validate(true)
                    });
                }
            },

        },

        computed: {
            form() {
                return {
                    user: this.user,
                    password: this.password,
                }
            },
        },

    }
</script>

<style scoped>
</style>