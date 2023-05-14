<template>
    <button   ref="openButton"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Login
    </button>
    <div id="authentication-modal" ref="modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only" ref="closeButton">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                    <form class="space-y-6" @submit="login">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                Login</label>
                            <input type="text" name="username" id="username" v-model="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="My Username" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                password</label>
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
                            <span v-show="!waiting">Login</span>
                        </button>
                        <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create
                                account</a>
                        </div> -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite'
import { Modal } from 'flowbite'

import axios from 'axios';
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
    mounted() {
        const modalOptions = {
            backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
        }
        this.modal = new Modal(this.$refs.modal, modalOptions);
        this.openButton = this.$refs.openButton
        this.closeButton = this.$refs.closeButton

        this.openButton.addEventListener('click', () => this.modal.toggle());
        this.closeButton.addEventListener('click', () => this.modal.hide());

    },
    computed: {
        loginUrl() {
            return this.$store.getters.getApiUrl + this.$store.getters.getLoginEndpoint
        }
    },
    methods: {
        async login(event) {
            event.preventDefault();
            this.waiting = true
            this.errorMessage = false
            try {
                const response = await axios.post('http://localhost/api/v1/auth/token/login/', {
                    username: this.username,
                    password: this.password,
                });
                this.waiting = false
                this.modal.hide()
                const token = response.data.auth_token;
                localStorage.setItem('token', token);

                this.$store.commit('setToken', token);

                // Redirect the user to the authenticated part of your application
                this.$router.push('/dictionary');
            } catch (error) {
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