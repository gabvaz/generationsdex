<template>
  <div class="home">
    <div class="welcome">
      <h3>Welcome to Generations Dex!</h3>
      <p>Select the pokemon generation you want to know more.</p>
    </div>
    <Generations :generations="generations" />
  </div>
</template>

<script>
import Generations from "@/components/Generations.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Generations,
  },
  computed: {
    ...mapState({
      generations: (state) => state.games.generations,
    }),
  },
  mounted() {
    this.getGenerationsList();
  },
  methods: {
    ...mapActions("games", {
      getGenerationsList: "GET_GENERATIONS_LIST",
    }),
  },
};
</script>
<style scoped lang="scss">
.welcome {
  margin-bottom: 5rem;
  > h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  > p {
    color: #747476;
    margin: 0;
  }
}
</style>
