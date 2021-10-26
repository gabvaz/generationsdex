<template>
  <div
    id="modal-container"
    :class="isModalOpen ? 'active' : ''"
    @click="$emit('closeModal')"
  >
    <div class="modal-background">
      <div class="modal" :style="{ backgroundColor: background }">
        <span>#{{ formatId(pokemon.id) }}</span>
        <h6>{{ pokemon.name }}</h6>
        <div class="types">
          <span
            v-for="(type, index) in pokemon.types"
            :key="index"
            class="type"
            :style="{ backgroundColor: types[type.type.name] }"
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
        <div class="sections">
          <div
            class="section"
            :style="{ backgroundColor: types[pokemon.types[0].type.name] }"
          >
            <h6 class="sectiont_title">Details</h6>
            <div class="line">
              <p class="key">Height</p>
              <p class="value">{{ pokemon.height }}</p>
            </div>
            <div class="line">
              <p class="key">Weight</p>
              <p class="value">{{ pokemon.weight }}</p>
            </div>
            <div class="line">
              <p class="key">Base xp</p>
              <p class="value">{{ pokemon.base_experience }}</p>
            </div>
          </div>
          <div
            class="section"
            :style="{ backgroundColor: types[pokemon.types[0].type.name] }"
          >
            <h6 class="sectiont_title">Stats</h6>
            <div class="line" v-for="(stat, i) in pokemon.stats" :key="i">
              <p class="key">{{ stat.stat.name }}</p>
              <p class="value">{{ stat.base_stat }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      types: {
        bug: "#8cb230",
        dark: "#58575f",
        dragon: "#0f6ac0",
        electric: "#eed535",
        fairy: "#ed6ec7",
        fighting: "#d04164",
        fire: "#fd7d24",
        flying: "#748fc9",
        ghost: "#556aae",
        grass: "#62b957",
        ground: "#dd7748",
        ice: "#61cec0",
        normal: "#9da0aa",
        poison: "#a552cc",
        psychic: "#ea5d60",
        rock: "#baab82",
        steel: "#417d9a",
        water: "#4a90da",
      },
    };
  },
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    pokemon: {
      type: Object,
      default: () => {},
    },
    background: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    formatId(id) {
      return id.toString().padStart(3, "0");
    },
  },
};
</script>

<style scoped lang="scss">
.types {
  display: flex;
  gap: 5px;
  justify-content: center;
  .type {
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: bold;
    text-transform: capitalize;
  }
}

.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  align-items: flex-start;
  .section {
    padding: 1rem 0.5rem;
    color: white;
    .sectiont_title {
      font-size: 1.2rem;
      margin: 1rem 0;
    }
    .line {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .key {
        text-transform: capitalize;
        font-weight: bold;
      }
    }
  }
}
#modal-container {
  position: fixed;
  display: table;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  z-index: 2;
  &.active {
    transform: scale(1);
    .modal-background {
      background: rgba(0, 0, 0, 0);
      animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      .modal {
        opacity: 0;
        animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
    }
    + .content {
      animation: scaleBack 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    &.out {
      animation: quickScaleDown 0s 0.5s linear forwards;
      .modal-background {
        animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        .modal {
          animation: scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
      }
      + .content {
        animation: scaleForward 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
    }
  }
}
.modal-background {
  display: flex;
  background: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  height: 100%;
  .modal {
    background: white;
    padding: 2rem;
    display: inline-block;
    font-weight: 300;
    position: relative;
    max-width: 350px;
    max-height: 350px;
    max-width: 350px;
    overflow-y: scroll;
    margin: 0 30px;
    > span {
      font-weight: bold;
      text-align: left;
    }
    > h6 {
      color: white;
      font-size: 1.5rem;
      text-transform: capitalize;
      margin: 0 0 1rem;
    }
    img {
      max-width: 130px;
      margin: 1rem 0;
    }
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
@keyframes fadeIn {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.7);
  }
}

@keyframes fadeOut {
  0% {
    background: rgba(0, 0, 0, 0.7);
  }
  100% {
    background: rgba(0, 0, 0, 0);
  }
}

@keyframes scaleUp {
  0% {
    transform: scale(0.8) translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
}

@keyframes scaleDown {
  0% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
  100% {
    transform: scale(0.8) translateY(1000px);
    opacity: 0;
  }
}

@keyframes scaleBack {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.85);
  }
}

@keyframes scaleForward {
  0% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes quickScaleDown {
  0% {
    transform: scale(1);
  }
  99.9% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
