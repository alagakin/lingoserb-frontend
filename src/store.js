import Vuex from 'vuex';
const state = {
    domain: 'http://localhost',
    loginEndpoint: '/api/v1/auth/token/login/',
    googleLoginEndpoint: '/api/v1/auth/google/',
    wordsEndpoint: '/api/v1/words/',
    savedWordsIdsEndpoint: '/api/v1/saved/ids/',
    addSavedEndpoint: '/api/v1/saved/add/',
    deleteSavedEndpoint: '/api/v1/saved/add/',
    token: false,
    authenticated: false,
    savedIds: [],
    progress: {},
    userProfile: {},
};

const mutations = { 
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
    setProgress(state, payload) {
        state.progress = payload
    },
    setUserProfile(state, payload) {
        state.userProfile = payload
    },
    setUserPicture(state, payload) {
        state.userProfile.picture = payload
        if (payload.lang) {
            localStorage.setItem('lang', payload.lang)
        }
    },
    setUserLang(state, payload) {
        state.userProfile.lang = payload
        localStorage.setItem('lang', payload)
    }
};

const getters = {
    userProfile: (state) => state.userProfile,
    profileEndpoint: (state) => () => state.domain + '/api/v1/acconunts/profile/',
    progressEndpoint: (state) => () => state.domain + '/api/v1/saved/progress/',
    isAuthenticated: (state) => state.authenticated == true,
    graphEndpoint: (state) => () => state.domain + '/api/v1/learning/graph/',
    textForWordEndpoint: (state) => (wordId) => state.domain + `/api/v1/text/for-word/${wordId}/`,
    subtopicsEndpoint: (state) => () => state.domain + '/api/v1/subtopic/',
    progress: (state) => () => state.progress,
    wordsEndpoint: (state) => () => state.domain + '/api/v1/words/',
    achievementsEndpoint: (state) => () => state.domain + '/api/v1/achievements/',
    googleLoginEndpoint: (state) => () => state.domain + '/api/v1/auth/google/',
    loginEndpoint: (state) => () => state.domain + '/api/v1/auth/token/login/',
    savedWordsEnpoint: (state) => () => state.domain + '/api/v1/saved/',
    wordsForTopicEndpoint: (state) => (topicId) => state.domain + `/api/v1/topic/${topicId}/words/`,
    topicEndpoint: (state) => (topicId) => state.domain + `/api/v1/topic/${topicId}/`,
    topicListEndpoint: (state) => () => state.domain + '/api/v1/topic/',
    startTopicLearningEndpoint: (state) => (topicId) => state.domain + `/api/v1/learning/${topicId}/start/`,
    finishTopicLearningEndpoint: (state) => (topicId) => state.domain + `/api/v1/learning/${topicId}/complete/`,
    skipWordEndpoint: (state) => (wordId) => state.domain + `/api/v1/learning/${wordId}/skip/`,
}


const store = new Vuex.Store({
    state,
    mutations,
    getters,
});

export default store;
