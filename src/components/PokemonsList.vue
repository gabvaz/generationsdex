<template>
  <div class="pokemons_list_container" id="pokedex">
    <div class="list_header">
      <h2>Pokemón Species</h2>
      <input v-model="search" placeholder="Search by pokemon name" />
      <span v-if="total != null"> Total: {{ total }} </span>
    </div>
    <div class="pokemons_list" v-if="total">
      <div
        v-for="(pokemon, index) in pokemonsOrdered"
        :key="index"
        class="pokemon_card"
        :style="{ backgroundColor: backgrounds[pokemon.types[0].type.name] }"
      >
        <span>#{{ formatId(pokemon.id) }}</span>
        <h4>
          {{ pokemon.name }}
        </h4>
        <div class="types">
          <span
            v-for="(type, index) in pokemon.types"
            :key="index"
            class="type"
          >
            {{ type.type.name }}
          </span>
        </div>
        <img
          :src="
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.other.home.front_default
          "
        />
      </div>
    </div>
    <p v-else>No results were found.</p>
    <button v-if="page + 1 < pages" class="load_more" @click="loadMore()">
      Load more
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { debounce } from "lodash";
export default {
  name: "PokemonsList",
  data() {
    return {
      backgrounds: {
        bug: "#8bd674",
        dark: "#6f6e78",
        dragon: "#7383b9",
        electric: "#f2cb55",
        fairy: "#eba8c3",
        fighting: "#eb4971",
        fire: "#ffa756",
        flying: "#83a2e3",
        ghost: "#8571be",
        grass: "#8bbe8a",
        ground: "#f78551",
        ice: "#91d8df",
        normal: "#b5b9c4",
        poison: "#9f6e97",
        psychic: "#ff6568",
        rock: "#d4c294",
        steel: "#4c91b2",
        water: "#58abf6",
      },
    };
  },
  computed: {
    ...mapGetters("games", {
      pokemonsOrdered: "orderedPokemons",
    }),
    ...mapState({
      generation: (state) => state.games.activeGeneration,
      pokemons: (state) => state.games.pokemons,
      page: (state) => state.games.page,
      pages: (state) => state.games.pages,
      total: (state) => state.games.total,
    }),
    search: {
      get() {
        return this.$store.state.games.search;
      },
      set(val) {
        this.setSearch(val);
      },
    },
  },
  watch: {
    search: debounce(function () {
      this.findPokemon(this.search);
    }, 600),
  },
  methods: {
    ...mapActions("games", {
      getPokedex: "GET_POKEDEX",
      findPokemon: "FIND_POKEMON",
    }),
    ...mapMutations("games", {
      setPage: "SET_PAGE",
      setSearch: "SET_SEARCH",
    }),
    sortedPokemons() {
      return this.pokemons.sort(function (a, b) {
        if (a.order > b.order) {
          return 1;
        }
        if (a.order < b.order) {
          return -1;
        }
        return 0;
      });
    },
    loadMore() {
      this.setPage(this.page + 1);
      this.getPokedex();
    },
    formatId(id) {
      return id.toString().padStart(3, "0");
    },
  },
};
</script>
<style scoped lang="scss">
.list_header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  input {
    height: 2rem;
    border-radius: 0.5rem;
    border: 1px solid #dbdbdb;
    outline: none;
    padding: 0 1rem;
  }
  h2 {
    text-align: left;
  }
  span {
    text-align: right;
  }
}
.pokemons_list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  max-width: 64rem;
  margin: 0 auto 2rem;
  .pokemon_card {
    border-radius: 0.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 1.25rem;
    position: relative;
    z-index: 2;
    &::after {
      content: "";
      background: url("https://mpng.subpng.com/20181124/ji/kisspng-pattern-crochet-photograph-image-information-5bf9bde5990c77.6927166415430937336269.jpg");
      opacity: 0.1;
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: contain;
      left: 0;
      top: 0;
      z-index: -1;
      transition: 0.6s;
      filter: grayscale(1);
    }
    &:hover {
      &::after {
        opacity: 0.3;
        filter: grayscale(0);
      }
    }
    > span {
      color: rgba(23, 23, 27, 0.6);
      font-weight: bold;
    }
    > h4 {
      margin: 0 0 1rem;
      color: white;
      font-size: 1.5rem;
      text-transform: capitalize;
    }
    > img {
      width: 100px;
      height: 100px;
      position: absolute;
      right: 0;
      top: 0;
    }
    > .types {
      display: flex;
      gap: 5px;
      > span {
        text-transform: capitalize;
        background: white;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        font-size: 12px;
        background: #74747678;
        color: white;
      }
    }
  }
}
.load_more {
  background: $red-1;
  padding: 1rem;
  border: none;
  border-radius: 0.25rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  width: 10rem;
}
</style>
