import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        recipes: [],
        apiUrl: 'https://api.edamam.com/search'
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        }
    },
    actions: {
        async getRecipes({ state, commit }, plan) {
            try {
                let response = await axios.get(`${state.apiUrl}`, {
                    params: {
                        q: plan,
                        app_id: '5b6623d5',
                        app_key: '46674aa2193dbb7b88ffd897331e661a',
                        from: 0,
                        to: 9
                    }
                });
                commit('setRecipes', response.data.hits);
            } catch (error) {
                commit('setRecipes', []);
            }
        }
    },
    modules: {}
});
