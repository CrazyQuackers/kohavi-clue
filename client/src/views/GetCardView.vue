<template>
  <div>
    <p id="gameVersionInfo">* Game Version: {{ capitalize(gameVersion) }}</p>
    <p id="version">V.1.0</p>
    <p id="equalsModeInfo">* Equals Mode: {{ equalsModeOnOrOff }}</p>
    <h1 id="title">KOHAVI CLUE</h1>
    <p id="cardText">{{ text }}</p>
    <div id="cardBox">
      <card-component
        :card-name="card"
        :game-version="gameVersion"
        :clickable="false"
      />
    </div>
    <div id="buttonBox">
      <button id="okButton" @click="clickOk()">OK</button>
    </div>
    <modal-component
      :openModal="openModal"
      :firstMessage="modalFirstText"
      :secondMessage="modalSecondText"
      :color="modalColor"
      @close-modal="closeModal()"
    />
  </div>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";

export default {
  name: "GetCardView",
  components: {
    CardComponent,
    ModalComponent,
  },
  data: () => ({
    gameVersion: "",
    card: "",
    text: "",
    equalsMode: false,
    openModal: false,
    modalFirstText: "",
    modalSecondText: "",
    modalColor: "",
  }),
  computed: {
    equalsModeOnOrOff() {
      return this.equalsMode ? "On" : "Off";
    },
  },
  methods: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    clickOk() {
      this.$router.push("/cards");
    },
    closeModal() {
      this.openModal = false;
      this.modalFirstText = "";
      this.modalSecondText = "";
      this.modalColor = "";
    },
  },
  mounted() {
    this.$socket.on("beingShownACard", (cardBeingShown) => {
      const text = cardBeingShown.text;

      if (text.includes("is showing you")) {
        this.modalFirstText = "You are recieving another card!";
        this.modalSecondText = `${text} "${cardBeingShown.card}"`;
        this.modalColor = "rgb(0, 176, 80)";
        this.openModal = true;
      }
    });

    this.$socket.on("userDisconnected", (whoDisconnected) => {
      this.modalFirstText = "A user has disconnected!";
      this.modalSecondText = `${whoDisconnected} has left the game`;
      this.modalColor = "red";
      this.openModal = true;
    });

    this.$socket.on("userReconnected", (whoReconnected) => {
      this.modalFirstText = "A user has reconnected!";
      this.modalSecondText = `${whoReconnected} has joined the game`;
      this.modalColor = "rgb(0, 176, 80)";
      this.openModal = true;
    });

    this.$socket.on("cardViewData", (data) => {
      this.card = data.shownCard.card;
      this.text = data.shownCard.text;
      this.gameVersion = data.gameVersion;
      this.equalsMode = data.equalsMode;
    });

    this.$socket.emit("getCardViewData");
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
  margin-bottom: 2%;
}

#cardText {
  color: white;
  text-align: center;
  font-size: 100%;
  margin-top: 4%;
}

#cardBox,
#buttonBox {
  text-align: center;
}

#cardBox {
  margin-top: 3%;
}

#okButton {
  color: white;
  font-size: 200%;
  background-color: rgb(0, 176, 80);
  border: 3px solid black;
  width: 15%;
  height: 10vh;
  margin-top: 9%;
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

  #cardText {
    margin-top: 0%;
  }

  #cardBox {
    margin-top: 5%;
  }

  #okButton {
    font-size: 130%;
    margin-top: 5%;
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

  #gameVersionInfo,
  #equalsModeInfo {
    font-size: 90%;
  }

  #equalsModeInfo {
    margin-top: -4%;
  }

  #cardText {
    margin-top: 3%;
  }

  #cardBox {
    margin-top: 4%;
  }

  #okButton {
    font-size: 150%;
    width: 25%;
    height: 15vh;
    margin-top: 0%;
  }
}
</style>
