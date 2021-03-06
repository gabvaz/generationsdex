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
        @click="handleClick(pokemon)"
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
    <Modal
      :isModalOpen="modal"
      :pokemon="selectedPokemon"
      :background="SelectedBackground"
      @closeModal="handleModal()"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { debounce } from "lodash";
import Modal from "@/components/Modal.vue";

export default {
  name: "PokemonsList",
  components: {
    Modal,
  },
  data() {
    return {
      modal: false,
      selectedPokemon: {},
      SelectedBackground: "",
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
    handleClick(pokemon) {
      this.handleModal();
      this.selectedPokemon = pokemon;
      this.SelectedBackground = this.backgrounds[pokemon.types[0].type.name];
    },
    handleModal() {
      this.modal = !this.modal;
    },
  },
};
</script>
<style scoped lang="scss">
.list_header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 1rem;
  }
  input {
    height: 2rem;
    border-radius: 0.5rem;
    border: 1px solid #dbdbdb;
    outline: none;
    padding: 0 1rem;
    @media (max-width: 767px) {
      margin-bottom: 1rem;
    }
  }
  h2 {
    text-align: left;
  }
  span {
    text-align: right;
    font-weight: bold;
  }
}
.pokemons_list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  max-width: 64rem;
  margin: 0 auto 2rem;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .pokemon_card {
    border-radius: 0.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 1.25rem;
    position: relative;
    z-index: 2;
    cursor: pointer;
    &::after {
      content: "";
      background: url("~@/assets/images/pokeballs.jpg");
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
