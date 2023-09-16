<template>
  <div>
    <p id="version">V.1.0</p>
    <h1 id="title">KOHAVI CLUE</h1>
    <img id="logo" src="../images/kohaviClueLogo.png" alt="Kohavi Clue Logo" />
    <div class="flex-container">
      <div id="nameItem">
        <p id="enterName">Enter your name:</p>
        <input type="text" id="name" name="name" size="25" v-model="name" />
      </div>
      <div v-if="isHost" id="versionItem">
        <p id="pickVersion">Pick a version:</p>
        <img
          id="giftLogo"
          src="../images/gift/giftLogo.png"
          alt="Gift Logo"
          @click="clickedGameVersion('gift')"
          :style="{
            'border-color':
              gameVersion === 'gift' ? 'rgb(0, 176, 80)' : 'black',
          }"
        />
        <img
          id="clueLogo"
          src="../images/clue/clueLogo.png"
          alt="Clue Logo"
          @click="clickedGameVersion('clue')"
          :style="{
            'border-color':
              gameVersion === 'clue' ? 'rgb(0, 176, 80)' : 'black',
          }"
        />
      </div>
    </div>
    <div v-if="isHost" id="checkboxContainer">
      <input type="checkbox" id="checkbox" v-model="equalsMode" />
      <span id="checkboxLabel">Equals Mode</span>
    </div>
    <div id="buttonBox">
      <button id="button" :class="buttonType" @click="createOrJoinGameClick()">
        {{ createOrJoinGame }}
      </button>
    </div>
    <div v-if="lobbyStarted && !isHost">
      <p id="gameVersionInfo">* Game Version: {{ capitalize(gameVersion) }}</p>
      <p id="equalsModeInfo">* Equals Mode: {{ equalsModeOnOrOff }}</p>
    </div>
    <modal-component
      :openModal="openModal"
      :firstMessage="'Something went wrong!'"
      :secondMessage="modalText"
      :color="'red'"
      @close-modal="closeModal()"
    />
  </div>
</template>

<script>
import ModalComponent from "../components/ModalComponent.vue";

export default {
  name: "HomeView",
  components: {
    ModalComponent,
  },
  data: () => ({
    name: "",
    names: [],
    gameVersion: "",
    isHost: false,
    lobbyStarted: false,
    equalsMode: false,
    gameStarted: false,
    recentPlayer: false,
    openModal: false,
    modalText: "",
  }),
  watch: {
    name(newName) {
      const formattedName = this.capitalize(newName);

      if (this.names.includes(formattedName)) {
        this.$socket.emit("isRecentPlayer", formattedName);
      }
    },
  },
  computed: {
    createOrJoinGame() {
      return this.isHost ? "Create Game" : "Join Game";
    },
    nameContainsOnlyLetters() {
      return /^[a-zA-Z]+$/.test(this.name);
    },
    equalsModeOnOrOff() {
      return this.equalsMode ? "On" : "Off";
    },
    buttonType() {
      return this.isHost ? "createBtn" : "joinBtn";
    },
  },
  methods: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    },
    clickedGameVersion(gameVersion) {
      this.gameVersion = gameVersion === this.gameVersion ? "" : gameVersion;
    },
    closeModal() {
      this.openModal = false;
      this.modalText = "";
    },
    createOrJoinGameClick() {
      if (this.recentPlayer)
        this.$socket.emit("playerRejoining", this.capitalize(this.name));
      else if (!this.name) {
        this.modalText = "Your name can't be blank!";
        this.openModal = true;
      } else if (!this.nameContainsOnlyLetters) {
        this.modalText = "Your name can only contain letters!";
        this.openModal = true;
      } else if (this.name.length < 3) {
        this.modalText = "Your name must have at least 3 letters!";
        this.openModal = true;
      } else if (this.name.length > 8) {
        this.modalText = "Your name can't have more than 8 letters!";
        this.openModal = true;
      } else if (this.names.includes(this.capitalize(this.name))) {
        this.modalText = "Your name is already taken!";
        this.openModal = true;
      } else {
        const formattedName = this.capitalize(this.name);

        if (this.isHost)
          if (this.gameVersion !== "gift" && this.gameVersion !== "clue") {
            this.modalText = "You need to pick a game version!";
            this.openModal = true;
          } else {
            this.$socket.emit("createLobby", {
              name: formattedName,
              gameVersion: this.gameVersion,
              equalsMode: this.equalsMode,
            });
            this.$router.push("/lobby");
          }
        else if (!this.lobbyStarted) {
          this.modalText = "The host hasn't created the game yet!";
          this.openModal = true;
        } else if (this.names.length >= 6) {
          this.modalText = "Max amount of players reached!";
          this.openModal = true;
        } else if (this.gameStarted) {
          this.modalText = "The game has already started!";
          this.openModal = true;
        } else {
          this.$socket.emit("joinLobby", formattedName);
          this.$router.push("/lobby");
        }
      }
    },
  },
  mounted() {
    this.$socket.on("names", (names) => {
      this.names = names;
    });

    this.$socket.on("isHost", (isHost) => {
      this.isHost = isHost;
    });

    this.$socket.on("gameStarted", (gameStarted) => {
      this.gameStarted = gameStarted;
    });

    this.$socket.on("recentPlayer", (recentPlayer) => {
      this.recentPlayer = recentPlayer;
    });

    this.$socket.on("rejoinGame", () => {
      this.$router.push("/cards");
    });

    this.$socket.on("lobbyStateHasChanged", (data) => {
      this.names = data.names;
      this.lobbyStarted = data.lobbyStarted;
      this.equalsMode = data.equalsMode;
      this.gameVersion = data.gameVersion;
    });

    this.$socket.on("homeViewData", (data) => {
      this.names = data.names;
      this.isHost = data.isHost;
      this.lobbyStarted = data.lobbyStarted;
      this.gameVersion = data.gameVersion;
      this.gameStarted = data.gameStarted;
      this.equalsMode = data.equalsMode;
    });

    this.$socket.emit("getHomeViewData");
  },
};
</script>

<style scoped>
#version {
  text-align: right;
  color: white;
  font-size: 200%;
  margin-right: 1%;
}

#title {
  text-align: center;
  color: white;
  font-size: 400%;
}

#logo {
  display: block;
  margin: auto;
  width: 20%;
  height: auto;
}

.flex-container {
  display: flex;
  justify-content: space-evenly;
}

#nameItem {
  margin-top: 5%;
}

#enterName {
  color: white;
  font-size: 140%;
  margin-bottom: 0.3%;
}

#name {
  border: 3px solid black;
  background-color: white;
  height: 4vh;
}

#versionItem {
  margin-top: 2%;
  width: 15%;
}

#pickVersion {
  color: white;
  font-size: 140%;
  text-align: center;
}

#giftLogo,
#clueLogo {
  width: 50%;
  height: auto;
  border-width: 3px;
  border-style: solid;
  cursor: pointer;
  background-color: rgb(31, 78, 121);
}

#giftLogo {
  margin-left: -3%;
}

#clueLogo {
  margin-left: 3%;
}

#buttonBox {
  text-align: center;
}

#button {
  color: white;
  font-size: 200%;
  background-color: rgb(0, 176, 80);
  border: 3px solid black;
  width: 15%;
  height: 10vh;
}

.createBtn {
  margin-top: 1%;
}

.joinBtn {
  margin-top: 5%;
}

#checkboxContainer {
  text-align: center;
  margin-top: 5%;
}

#checkbox {
  cursor: pointer;
  width: 5vw;
  height: 5vh;
}

#checkboxLabel {
  color: white;
  font-size: 150%;
}

#gameVersionInfo,
#equalsModeInfo {
  color: white;
  text-align: center;
  font-size: 100%;
}

#equalsModeInfo {
  margin-top: -1%;
}

/* Laptops */
@media only screen and (max-width: 1300px) {
  #gameVersionInfo,
  #equalsModeInfo {
    font-size: 80%;
  }

  #title {
    margin-top: -5%;
  }

  #nameItem {
    margin-top: 7%;
  }

  #checkboxContainer {
    margin-top: 1%;
  }

  #checkboxLabel {
    font-size: 100%;
  }

  #button {
    font-size: 150%;
  }
}

/* Mobile */
@media only screen and (max-width: 1000px) {
  #version {
    font-size: 100%;
  }

  #title {
    font-size: 200%;
    padding-top: 2%;
  }

  #logo {
    margin-left: 8%;
    margin-top: -5%;
    margin-bottom: -5%;
  }

  #enterName {
    font-size: 120%;
  }

  #name {
    height: 9vh;
  }

  #pickVersion {
    font-size: 120%;
  }

  #versionItem {
    width: 25%;
  }

  #checkboxLabel {
    font-size: 90%;
  }

  #button {
    width: 25%;
    height: 15vh;
    font-size: 150%;
    margin-top: 2%;
  }

  .joinBtn {
    margin-top: 5% !important;
  }

  #gameVersionInfo,
  #equalsModeInfo {
    font-size: 90%;
  }
}
</style>
