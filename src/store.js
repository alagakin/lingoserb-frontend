import Vuex from 'vuex';

const apiModule = {
    state: {
        apiUrl: 'http://localhost',
        loginEndpoint: '/api/v1/auth/token/login/',
        wordsEndpoint: '/api/v1/words/',
        savedWordsIdsEndpoint: '/api/v1/saved/ids/',
        addSavedEndpoint: '/api/v1/saved/add/',
        deleteSavedEndpoint: '/api/v1/saved/add/',
        token: false,
        authenticated: false,
        savedIds: []

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
        },
        setSavedWordsIds(state, payload) {
            state.savedIds = payload
        }
    },
    actions: {
       
    },
    getters: {
        getApiUrl: (state) => state.apiUrl,
        getLoginEndpoint: (state) => state.loginEndpoint,
        getToken: (state) => state.token,
        isAuthenticated: (state) => state.authenticated == true,
        getWordsEndpoint: (state) => state.apiUrl + state.wordsEndpoint,
        getSavedWordsIdsEnpoint: (state) => state.apiUrl + state.savedWordsIdsEndpoint,
        getAddSavedEnpoint: (state) => state.apiUrl + state.addSavedEndpoint,
        getDeleteSavedEnpoint: (state) => state.apiUrl + '/api/v1/saved/delete/',
        getSavedWordsIds: (state) => state.savedIds
    },
};

const store = new Vuex.Store({
    modules: {
        api: apiModule,
    },
    // Other store configuration options
});

export default store;
