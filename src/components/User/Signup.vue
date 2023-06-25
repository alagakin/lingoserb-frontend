<template>
    <form class="space-y-4 md:space-y-6" @submit="signup">
        <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
            <input type="username" name="username" id="username" v-model="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="my username" required="">
        </div>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required="">
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" v-model="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
        </div>
        <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                password</label>
            <input type="password" v-model="confirm" name="confirm-password" id="confirm-password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
        </div>
        <div class="" v-show="errors.length">
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-for="error in errors" v-text="error">
            </p>
        </div>
        <button type="submit" :disabled="waiting" class="w-full text-white bg-blue-700
                                 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" v-show="waiting" />
            <span v-show="!waiting">Create an account</span>
        </button>

        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <a href="#" @click="showLogin"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
        </p>
    </form>
</template>

<script>
import { apiLogin } from '../../api';
import { mapGetters } from 'vuex';
export default {
    name: 'Signup',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirm: '',
            waiting: false,
            errors: [],
        }
    },
    computed: {
        ...mapGetters(['signupEndpoint'])
    },
    methods: {
        showLogin() {
            this.$emit('showLogin')
        },
        async signup(e) {
            e.preventDefault()
            this.clearErrors()
            this.waiting = true
            if (this.checkPasswords()) {
                try {
                    const data = await apiLogin(this.signupEndpoint(), {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    })
                    this.$emit('successSignup')
                } catch (error) {
                    for (const key in error.response.data) {
                        error.response.data[key].forEach(element => {
                            this.errors.push(element)
                        });
                    }
                }
            }
            this.waiting = false
        },
        checkPasswords() {
            if (this.password !== this.confirm) {
                this.errors.push('Passwords do not match')
                return false
            }
            return true
        },
        clearErrors() {
            this.errors = []
        }
    }
}
</script>