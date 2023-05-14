import Vuex from 'vuex';

const apiModule = {
    state: {
        apiUrl: 'localhost',
        loginEndpoint: '/api/v1/auth/token/login/',
        token: false,
        authenticated: false

    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setAuthenticated(state, payload) {
            state.authenticated = payload
        },
        logout(state) {
            state.authenticated = false
            state.token = false
        }
    },
    actions: {
       
    },
    getters: {
        getApiUrl: (state) => state.apiUrl,
        getLoginEndpoint: (state) => state.loginEndpoint,
        getToken: (state) => state.token,
        isAuthenticated: (state) => state.authenticated == true,
    },
};

const store = new Vuex.Store({
    modules: {
        api: apiModule,
    },
    // Other store configuration options
});

export default store;
