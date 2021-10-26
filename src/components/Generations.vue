<template>
  <div class="generations-list">
    <div
      v-for="(generation, index) in generations"
      class="generation-card"
      :key="index"
    >
      <p class="card-title">{{ filterName(generation.names) }}</p>
      <div class="read-more"><img src="@/assets/images/read-more.png" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Generations",
  props: {
    generations: {
      type: Array,
      default: () => [],
    },
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
