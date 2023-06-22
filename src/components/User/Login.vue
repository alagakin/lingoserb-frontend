<template>
    <button ref="openButton"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        {{ $t('auth.login') }}
    </button>
    <div ref="modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only" ref="closeButton">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">{{ $t('auth.modal.login.title') }}
                    </h3>
                    <form class="space-y-6" @submit="login">
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
                            <!-- <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a> -->
                        </div>
                        <button type="submit" :disabled="waiting" class="w-full text-white bg-blue-700
                                 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" v-show="waiting" />
                            <span v-show="!waiting">{{ $t('auth.login') }}</span>
                        </button>
                        <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create
                                account</a>
                        </div> -->

                        <button @click="google"
                            class="m-auto flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px"
                                viewBox="-0.5 0 48 48" version="1.1">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'flowbite'
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
    mounted() {
        const modalOptions = {
            backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
        }
        this.modal = new Modal(this.$refs.modal, modalOptions);
        this.openButton = this.$refs.openButton
        this.closeButton = this.$refs.closeButton

        this.openButton.addEventListener('click', () => this.modal.toggle());
        this.closeButton.addEventListener('click', () => this.modal.hide());
        this.styleBodyWhenOpen()
    },
    methods: {
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
                this.modal.hide()
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
                this.modal.hide()
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