import games from "./modules/gamesModule";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    games,
  },
  strict: process.env.NODE_ENV !== "production",
});

export default store;
