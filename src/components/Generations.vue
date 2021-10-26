<template>
  <div class="generations-list">
    <div
      v-for="(generation, index) in generations"
      class="generation-card"
      :key="index"
      @click="$router.push(`/generation/${generation.id}`)"
    >
      <p class="card-title">{{ filterName(generation.names) }}</p>
      <div class="read-more"><img src="@/assets/images/read-more.png" /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Generations",
  computed: {
    ...mapGetters("games", {
      generations: "orderedGenerations",
    }),
  },
  methods: {
    filterName(names) {
      const translation = names.find((el) => {
        return el.language.name === "en";
      });
      return translation.name;
    },
  },
};
</script>

<style scoped lang="scss">
.generations-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  max-width: 64rem;
  margin: 0 auto;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
  > .generation-card {
    background: white;
    border-radius: 0.3rem;
    border: 1px solid $gray-1;
    position: relative;
    z-index: 1;
    padding: 1.6rem;
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
    }
    &:hover {
      &:after {
        opacity: 0.3;
      }
    }
    .card-title {
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      font-family: "Press Start 2P";
      margin: 1rem;
    }
    button {
      color: #ffcd01;
      background: #356abc;
      font-family: "Press Start 2P";
      border: none;
      padding: 10px 15px;
      border-radius: 0.5rem;
      text-transform: uppercase;
      font-size: 12px;
      margin-top: 1rem;
    }
  }
}
</style>
