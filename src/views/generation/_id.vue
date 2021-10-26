<template>
  <div v-if="generation" class="generation_details">
    <div class="title_area">
      <img src="@/assets/images/back.png" @click="$router.push('/')" />
      <h2>{{ title }}</h2>
    </div>
    <div class="versions">
      <h6 class="versions-title">Versions</h6>
      <div>
        <span v-for="(version, index) in versions" :key="index" class="version">
          {{ formatName(version.name) }}
        </span>
      </div>
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
  margin: 0 15px;
  .versions {
    display: flex;
    max-width: 300px;
    margin: 0 auto;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    border: 2px solid $red-1;
    padding: 1rem;
    border-radius: 0.5rem;
    > h6 {
      font-family: $title-1;
      margin: 0;
      font-size: 1rem;
    }
    > div {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .version {
    text-transform: capitalize;
    background: $red-1;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  .title_area {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
    img {
      max-width: 30px;
      cursor: pointer;
    }
    h2 {
      font-size: 2rem;
      font-family: $title-1;
      text-transform: capitalize;
      @media (max-width: 1023px) {
        font-size: 1.4rem;
        line-height: 2rem;
      }
    }
  }

  .version_body {
    margin-top: 2.5rem;
  }
}
</style>
