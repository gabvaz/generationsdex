<template>
  <div v-if="generation" class="generation_details">
    <h2>{{ title }}</h2>
    <div class="versions">
      <span v-for="(version, index) in versions" :key="index" class="version">
        {{ formatName(version.name) }}
      </span>
    </div>

    <div class="version_body">
      <PokemonsList />
    </div>
  </div>
</template>

<script>
import PokemonsList from "@/components/PokemonsList.vue";

import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return { title: "" };
  },
  components: {
    PokemonsList,
  },
  watch: {
    generation(newValue) {
      const translation = newValue.names.find((el) => {
        return el.language.name === "en";
      });
      this.title = translation.name + " - " + newValue.main_region.name;
    },
  },
  computed: {
    ...mapState({
      generation: (state) => state.games.activeGeneration,
      versions: (state) => state.games.activeVersions,
    }),
  },
  mounted() {
    this.getGeneration(this.$router.currentRoute.params.id);
  },
  methods: {
    ...mapActions("games", {
      getGeneration: "GET_SINGLE_GENERATION",
    }),
    formatName(name) {
      return name.replaceAll("-", " ");
    },
  },
};
</script>
<style scoped lang="scss">
.generation_details {
  .versions {
    display: flex;
    max-width: 350px;
    margin: 0 auto;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
  }
  .version {
    text-transform: capitalize;
    background: $red-1;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  h2 {
    font-size: 2rem;
    font-family: $title-1;
    text-transform: capitalize;
  }
  .version_body {
    margin-top: 5rem;
  }
}
</style>
