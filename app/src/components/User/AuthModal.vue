<template>
    <button ref="openButton"
        class="block text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        {{ $t('auth.login') }}
    </button>
    <div ref="modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    @click="modal.hide()"
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
                    <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">{{ $t('auth.modal.login.title') }}</h3>
                    <div class="flex align-middle text-sm mb-2" v-if="showSuccessSignup">
                        <font-awesome-icon :icon="['far', 'circle-check']" style="color: #56ba2c;" class="mt-auto mb-auto mr-1"/>
                        <p>Your account has been created</p>
                    </div>
                    <Login @authenticated="authenticated" v-if="login" @showSignup="showSignup" />
                    <Signup v-if="signup" @showLogin="showLogin" @successSignup="successSignup"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Signup from './Signup.vue';
import { Modal } from 'flowbite'
import Login from './Login.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import eventBus from '../../eventBus'

export default {
    name: "AuthModal",
    data() {
        return {
            login: true,
            signup: false,
            showSuccessSignup: false,
        }
    },
    beforeMount() {
        library.add(far);

    },
    mounted() {
        const modalOptions = {
            backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
        };
        this.modal = new Modal(this.$refs.modal, modalOptions);
        this.openButton = this.$refs.openButton;
        this.closeButton = this.$refs.closeButton;
        this.openButton.addEventListener("click", () => this.modal.toggle());
        this.closeButton.addEventListener("click", () => this.modal.hide());
        this.styleBodyWhenOpen();

        eventBus.$on('show-auth-modal', () => this.modal.show());
        
    },

    methods: {
        styleBodyWhenOpen() {
            let padding = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.setProperty("--paddingRight", padding + "px");
        },
        authenticated() {
            this.modal.hide();
        },
        showSignup() {
            this.login = false;
            this.signup = true;
        },
        showLogin() {
            this.login = true;
            this.signup = false;
        },
        successSignup() {
            this.showSuccessSignup = true;
            this.login = true;
            this.signup = false;
        }
    },
    components: { Login, Signup }
}
</script>