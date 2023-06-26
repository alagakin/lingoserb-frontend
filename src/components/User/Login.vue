<template>

    <form class="space-y-4" @submit="login">
        <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                $t('auth.modal.login.login_field') }}</label>
            <input type="text" name="username" id="username" v-model="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                :placeholder="$t('auth.modal.login.login_field_placeholder')" required>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                $t('auth.modal.login.password_field') }}</label>
            <input type="password" name="password" v-model="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required>
        </div>
        <div class="flex justify-between">
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-show="errorMessage">{{ errorMessage }}
            </p>
        </div>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            {{ $t('auth.modal.not_registered') }} <a href="#" class="text-blue-700 hover:underline dark:text-blue-500" @click="signup">{{ $t('auth.modal.create_account') }}</a>
        </div>

        <button type="submit" :disabled="waiting" class="w-full text-white bg-blue-700
                                 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" v-show="waiting" />
            <span v-show="!waiting">{{ $t('auth.login') }}</span>
        </button>

        <button @click="google"
            class="m-auto flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">
                <title>Google-color</title>
                <desc>Created with Sketch.</desc>
                <defs> </defs>
                <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Color-" transform="translate(-401.000000, -860.000000)">
                        <g id="Google" transform="translate(401.000000, 860.000000)">
                            <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                id="Fill-1" fill="#FBBC05"> </path>
                            <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                id="Fill-2" fill="#EB4335"> </path>
                            <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                id="Fill-3" fill="#34A853"> </path>
                            <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                id="Fill-4" fill="#4285F4"> </path>
                        </g>
                    </g>
                </g>
            </svg>
            <span>{{ $t('auth.modal.login.google_auth_button') }}</span>

        </button>


    </form>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { apiLogin } from '../../api';
import { googleSdkLoaded } from "vue3-google-login"
import { mapGetters } from 'vuex';


export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            waiting: false
        };
    },
    computed: {
        ...mapGetters(['googleLoginEndpoint', 'loginEndpoint']),
    },
    methods: {
        signup() {
            this.$emit('showSignup');
        },
        google(e) {
            e.preventDefault()
            googleSdkLoaded((google) => {
                google.accounts.oauth2.initCodeClient({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    scope: 'email profile openid',
                    callback: (response) => {
                        if (response['code']) {
                            this.googleLogin(response['code'])
                        }
                    }
                }).requestCode()
            })
        },
        async googleLogin(code) {
            try {
                const response = await apiLogin(this.googleLoginEndpoint(), {
                    code: code,
                });
                this.$emit('authenticated')
                
                const token = response.key;
                if (token) {
                    localStorage.setItem('token', token);

                    this.$store.commit('setToken', token);
                    this.$store.commit('setAuthenticated', true)

                    this.$router.push({ name: 'Profile' });
                }

            } catch (error) {
                console.log(error)
                this.errorMessage = 'Invalid username or password';
            }
        },


        styleBodyWhenOpen() {
            let padding = window.innerWidth - document.documentElement.clientWidth
            document.body.style.setProperty('--paddingRight', padding + 'px')
        },

        async login(event) {
            event.preventDefault();
            this.waiting = true
            this.errorMessage = false
            try {
                const response = await apiLogin(this.loginEndpoint(), {
                    username: this.username,
                    password: this.password,
                });
                this.waiting = false
                this.$emit('authenticated')
                const token = response.auth_token;
                localStorage.setItem('token', token);

                this.$store.commit('setToken', token);
                this.$store.commit('setAuthenticated', true)

                // Redirect the user to the authenticated part of your application
                this.$router.push({ name: 'Profile' });
            } catch (error) {
                console.log(error)
                this.waiting = false
                this.errorMessage = 'Invalid username or password';
            }
        },
    },
    beforeMount() {
        library.add(faSpinner);
    },
}
</script>