<template>
  <div>
    <p id="gameVersionInfo">* Game Version: {{ capitalize(gameVersion) }}</p>
    <p id="version">V.1.0</p>
    <p id="equalsModeInfo">* Equals Mode: {{ equalsModeOnOrOff }}</p>
    <h1 id="title">KOHAVI CLUE</h1>
    <img
      v-if="gameVersion === 'clue'"
      id="logo"
      src="../images/clue/clueLogo.png"
      alt="Clue Version Logo"
    />
    <img
      v-else-if="gameVersion === 'gift'"
      id="logo"
      src="../images/gift/giftLogo.png"
      alt="Gift Version Logo"
    />
    <img
      v-else
      id="logo"
      src="../images/kohaviClueLogo.png"
      alt="Game Version Logo"
    />
    <p id="waitingFor">
      {{ waitingForMessage }}
    </p>
    <ul id="playerList">
      <li
        v-for="player in iterableNames"
        :key="player.id"
        :style="{
          color: player.name === name ? 'rgb(237, 125, 49)' : 'white',
        }"
        class="player"
      >
        {{ formatName(player.name) }}
      </li>
    </ul>
    <p id="playersToStart" :class="howManyPlayersClass">
      {{ playersToStartMessage }}
    </p>
    <div v-if="isHost && names.length >= 3" id="startButtonBox">
      <button id="startButton" @click="startGame()">Start Game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LobbyView",
  data: () => ({
    name: "",
    names: [],
    gameVersion: "",
    equalsMode: false,
  }),
  computed: {
    iterableNames() {
      const iterableNames = [];

      for (let index = 0; index < this.names.length; index++) {
        iterableNames.push({
          id: index,
          name: this.names[index],
        });
      }

      return iterableNames;
    },
    isHost() {
      return this.names.length > 0 ? this.names[0] === this.name : false;
    },
    hostName() {
      return this.names.length > 0 ? this.names[0] : "";
    },
    waitingForMessage() {
      if (this.names.length < 3) return "Waiting for players to join...";

      if (this.isHost) return "Waiting for you to start the game...";

      return "Waiting for host to start the game...";
    },
    playersToStartMessage() {
      return `Need at least 3 players to start (${this.names.length}/6)`;
    },
    equalsModeOnOrOff() {
      return this.equalsMode ? "On" : "Off";
    },
    howManyPlayersClass() {
      return "players-" + this.names.length;
    },
  },
  methods: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    formatName(name) {
      return this.hostName === name ? name + " (host)" : name;
    },
    startGame() {
      this.$socket.emit("startGame");
    },
  },
  mounted() {
    this.$socket.on("names", (names) => {
      this.names = names;
    });

    this.$socket.on("gameStarted", (gameStarted) => {
      if (gameStarted) this.$router.push("/cards");
    });

    this.$socket.on("lobbyStateHasChanged", (data) => {
      this.names = data.names;
      this.equalsMode = data.equalsMode;
      this.gameVersion = data.gameVersion;
    });

    this.$socket.on("lobbyViewData", (data) => {
      this.names = data.names;
      this.name = data.name;
      this.gameVersion = data.gameVersion;
      this.equalsMode = data.equalsMode;
    });

    this.$socket.emit("getLobbyViewData");
  },
};
</script>

<style scoped>
#version {
  text-align: right;
  color: white;
  font-size: 200%;
  margin-right: 1%;
  margin-top: -2%;
}

#gameVersionInfo,
#equalsModeInfo {
  margin-left: 1%;
  color: white;
}

#equalsModeInfo {
  margin-top: -2%;
}

#title {
  text-align: center;
  color: white;
  font-size: 400%;
}

#logo {
  display: block;
  margin: auto;
  width: 15%;
  height: auto;
}

#waitingFor {
  color: white;
  font-size: 140%;
  margin-left: 10%;
  margin-top: 1%;
}

#playersToStart {
  color: white;
  font-size: 100%;
  margin: auto;
  text-align: center;
  width: 11%;
}

.players-1 {
  margin-top: 12.5% !important;
}

.players-2 {
  margin-top: 11% !important;
}

.players-3 {
  margin-top: 9.5% !important;
}

.players-4 {
  margin-top: 8% !important;
}

.players-5 {
  margin-top: 6.5% !important;
}

.players-6 {
  margin-top: 5% !important;
}

#playerList {
  margin-left: 10%;
}

.player {
  font-size: 120%;
}

#startButtonBox {
  text-align: center;
}

#startButton {
  color: white;
  font-size: 200%;
  background-color: rgb(0, 176, 80);
  border: 3px solid black;
  width: 15%;
  height: 10vh;
  margin-top: 0.5%;
}

/* Laptops */
@media only screen and (max-width: 1300px) {
  #version {
    margin-top: -3%;
  }

  #equalsModeInfo {
    margin-top: -3%;
  }

  #title {
    margin-top: -4%;
  }

  #startButton {
    font-size: 150%;
  }

  #playersToStart {
    width: 16.5%;
  }

  .players-1 {
    margin-top: 8.25% !important;
  }

  .players-2 {
    margin-top: 6% !important;
  }

  .players-3 {
    margin-top: 3.75% !important;
  }

  .players-4 {
    margin-top: 1.5% !important;
  }

  .players-5 {
    margin-top: -0.75% !important;
  }

  .players-6 {
    margin-top: -3% !important;
  }
}

/* Mobile */
@media only screen and (max-width: 1000px) {
  #version {
    font-size: 100%;
  }

  #title {
    font-size: 200%;
  }

  #logo {
    margin-right: 13%;
    margin-top: -5%;
    margin-bottom: -5%;
  }

  #gameVersionInfo,
  #equalsModeInfo {
    font-size: 90%;
  }

  #equalsModeInfo {
    margin-top: -4%;
  }

  #waitingFor {
    font-size: 120%;
    margin-left: 10%;
  }

  .player {
    font-size: 100%;
  }

  #playersToStart {
    font-size: 100%;
    text-align: center;
    width: 25%;
  }

  .players-1 {
    margin-top: 9% !important;
  }

  .players-2 {
    margin-top: 6.2% !important;
  }

  .players-3 {
    margin-top: 3.4% !important;
  }

  .players-4 {
    margin-top: 0.6% !important;
  }

  .players-5 {
    margin-top: -2.2% !important;
  }

  .players-6 {
    margin-top: -5% !important;
  }

  #startButton {
    font-size: 150%;
    width: 25%;
    height: 15vh;
    margin-top: 1%;
  }
}
</style>
