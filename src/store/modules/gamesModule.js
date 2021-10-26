import api from "@/api/games-api";

// state
const state = () => ({
  generationsList: [],
  generations: [],
});

// getters
const getters = {};

// actions
const actions = {
  GET_GENERATIONS_LIST({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      api
        .getGeneations()
        .then((result) => {
          resolve(true);
          console.log(result);
          commit("SET_GENERATIONS", result.data);
          dispatch("GET_GENERATION_DETAILS");
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  GET_GENERATION_DETAILS({ commit, state }) {
    commit("CLEAR_GENERATIONS");
    state.generationsList.map(async (data) => {
      const splitUrl = data.url.split("/");
      const pos = splitUrl.length - 2;
      const id = splitUrl[pos];
      api
        .getGenerationDetails(id)
        .then((result) => {
          commit("PUSH_GENERATION", result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};

// mutations
const mutations = {
  SET_GENERATIONS(state, payload) {
    state.generationsList = payload.results;
  },
  PUSH_GENERATION(state, payload) {
    state.generations.push(payload);
  },
  CLEAR_GENERATIONS(state) {
    state.generations = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
