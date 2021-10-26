import api from "@/api/games-api";

// state
const state = () => ({
  generationsList: [],
  generations: [],
  activeGeneration: {},
  activeVersions: [],
  pokemons: [],
  page: 0,
  pages: 0,
  total: 0,
  search: "",
});

// getters
const getters = {
  orderedPokemons: (state) => {
    return state.pokemons.slice().sort((a, b) => a.id - b.id);
  },
};

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
  GET_SINGLE_GENERATION({ state, commit, dispatch }, id) {
    api
      .getGenerationDetails(id)
      .then((result) => {
        commit("SET_TOTAL", result.data.pokemon_species.length);
        commit("SET_PAGES", Math.ceil(Number(state.total) / 9));
        commit("SET_PAGE", 0);
        commit("SET_GENERATION_ACTIVE", result.data);
        commit("CLEAR_POKEMON");
        commit("CLEAR_VERSION");
        dispatch("GET_VERSION_GROUP", result.data);
        dispatch("GET_POKEDEX", result.data.pokemon_species);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  FIND_POKEMON({ commit, state, dispatch }, search) {
    commit("CLEAR_POKEMON");
    if (search) {
      const filtered = state.activeGeneration.pokemon_species.filter(
        (data) =>
          JSON.stringify(data).toLowerCase().indexOf(search.toLowerCase()) !==
          -1
      );
      commit("SET_TOTAL", filtered.length);
      commit("SET_PAGES", Math.ceil(Number(state.total) / 9));
      commit("SET_PAGE", 0);
      dispatch("GET_POKEDEX", filtered);
    } else {
      commit("SET_TOTAL", state.activeGeneration.pokemon_species.length);
      commit("SET_PAGES", Math.ceil(Number(state.total) / 9));
      commit("SET_PAGE", 0);
      dispatch("GET_POKEDEX");
    }
  },
  GET_POKEDEX({ state, commit }) {
    let base;
    if (state.search) {
      base = state.activeGeneration.pokemon_species.filter(
        (data) =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(state.search.toLowerCase()) !== -1
      );
    } else {
      base = state.activeGeneration.pokemon_species;
    }
    const start = state.page * 9;
    let end;
    if (start + 9 <= state.total) {
      end = start + 9;
    } else {
      end = state.total;
    }
    for (let i = start; i < end; i++) {
      const splitUrl = base[i].url.split("/");
      const pos = splitUrl.length - 2;
      const id = splitUrl[pos];
      api
        .getPokemon(id)
        .then((result) => {
          commit("SET_POKEMON", result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  GET_VERSION_GROUP({ commit }, payload) {
    payload.version_groups.map(async (data) => {
      const splitUrl = data.url.split("/");
      const pos = splitUrl.length - 2;
      const id = splitUrl[pos];
      api
        .getVersionGroupDetails(id)
        .then((result) => {
          commit("PUSH_VERSION_GROUP", result.data);
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
  SET_GENERATION_ACTIVE(state, payload) {
    payload.pokemon_species.sort(function (a, b) {
      const urlA = a.url.split("/");
      const posA = urlA.length - 2;
      const idA = urlA[posA];

      const urlB = b.url.split("/");
      const posB = urlB.length - 2;
      const idB = urlB[posB];

      return idA - idB;
    });
    state.activeGeneration = payload;
    state.activeGeneration.versions_details = [];
  },
  PUSH_VERSION_GROUP(state, payload) {
    payload.versions.forEach((el) => {
      state.activeVersions.push(el);
    });
  },
  SET_POKEMON(state, payload) {
    state.pokemons.push(payload);
  },
  SET_TOTAL(state, payload) {
    state.total = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  SET_PAGES(state, payload) {
    state.pages = payload;
  },
  SET_SEARCH(state, payload) {
    state.search = payload;
  },
  CLEAR_GENERATIONS(state) {
    state.generations = [];
  },
  CLEAR_POKEMON(state) {
    state.pokemons = [];
  },
  CLEAR_VERSION(state) {
    state.activeVersions = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
