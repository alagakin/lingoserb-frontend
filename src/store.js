import Vuex from 'vuex';

const apiModule = {
    state: {
        apiUrl: 'localhost',
        loginEndpoint: '/api/v1/auth/token/login/'

    },
    mutations: {
      
    },
    actions: {
       
    },
    getters: {
        getApiUrl: (state) => state.apiUrl,
        getLoginEndpoint: (state) => state.loginEndpoint
    },
};

const store = new Vuex.Store({
    modules: {
        api: apiModule,
    },
    // Other store configuration options
});

export default store;
