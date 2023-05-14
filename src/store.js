import Vuex from 'vuex';

const apiModule = {
    state: {
        apiUrl: 'localhost',
        loginEndpoint: '/api/v1/auth/token/login/',
        token: false,
        authentificated: false

    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setAuthentificated(state, payload) {
            state.authentificated = payload
        },
        logout(state) {
            state.authentificated = false
            state.token = false
        }
    },
    actions: {
       
    },
    getters: {
        getApiUrl: (state) => state.apiUrl,
        getLoginEndpoint: (state) => state.loginEndpoint,
        getToken: (state) => state.token,
        isAuthentificated: (state) => state.authentificated == true,
    },
};

const store = new Vuex.Store({
    modules: {
        api: apiModule,
    },
    // Other store configuration options
});

export default store;
