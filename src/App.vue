<template>
  <div id="app">
    <div id="heading">
      <img
        @click="$router.push('/')"
        src="@/assets/images/generations-dex.png"
      />
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "Press Start 2P";
  src: local("PressStart2P"),
    url("~@/assets/fonts/PressStart2P-Regular.ttf") format("truetype");
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px 0;
  min-height: 100vh;
  background: $bg-light;
}
#heading {
  padding: 30px 0 60px;
  img {
    cursor: pointer;
  }
}
.container {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
