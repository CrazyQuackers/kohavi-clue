<template>
  <v-app>
    <v-main>
      <div class="app-container">
        <router-view />
      </div>
      <div class="rotate-container">
        <h1 id="kohaviClue">KOHAVI CLUE</h1>
        <p class="rotate-message">Please rotate your screen.</p>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$socket.on("connected", () => {
      this.$router.push("/");
    });
  },
  beforeDestroy() {
    this.$socket.close();
  },
};
</script>

<style>
@font-face {
  font-family: "ClueFont";
  src: url("./fonts/cascadia.otf") format("truetype");
}

.app-container {
  height: 100%;
  width: 100%;
  background-color: rgb(0, 32, 96);
  font-family: "ClueFont", "Courier New", Courier, monospace;
  display: block;
}

.rotate-container {
  display: none;
}

#kohaviClue {
  color: white;
  text-align: center;
  padding: 50% 0;
  font-size: 400%;
}

.rotate-message {
  color: white;
  text-align: center;
  margin-top: -20%;
  font-size: 100%;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

@media all and (orientation: portrait) {
  .app-container {
    display: none;
  }

  .rotate-container {
    height: 100%;
    width: 100%;
    background-color: rgb(0, 32, 96);
    font-family: "ClueFont", "Courier New", Courier, monospace;
    display: block;
  }
}
</style>
