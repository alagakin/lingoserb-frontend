import Vuex from 'vuex';

const apiModule = {
    state: {
        apiUrl: 'localhost',
        loginEndpoint: '/api/v1/auth/token/login/',
        token: 'dsf'

    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        }
    },
    actions: {
       
    },
    getters: {
        getApiUrl: (state) => state.apiUrl,
        getLoginEndpoint: (state) => state.loginEndpoint,
        getToken: (state) => state.token
    },
};

const store = new Vuex.Store({
    modules: {
        api: apiModule,
    },
    // Other store configuration options
});

export default store;
