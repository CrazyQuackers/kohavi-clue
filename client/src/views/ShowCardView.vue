<template>
  <div>
    <p id="gameVersionInfo">* Game Version: {{ capitalize(gameVersion) }}</p>
    <p id="version">V.1.0</p>
    <p id="equalsModeInfo">* Equals Mode: {{ equalsModeOnOrOff }}</p>
    <h1 id="title">KOHAVI CLUE</h1>
    <p id="cardShowing">Which card are you showing?</p>
    <div id="cardContainer">
      <card-component
        v-for="card in iterableCards"
        :key="card.id"
        :card-name="card.name"
        :game-version="gameVersion"
        :border-color="card.borderColor"
        :clickable="true"
        @picked-card="pickedNewCard(card.name)"
      />
    </div>
    <p id="showingTo">Who are you showing to?</p>
    <div id="namesContainer">
      <p
        v-for="name in iterableNames"
        :key="name.id"
        class="name"
        :style="{
          'border-color': showingTo === name.name ? 'rgb(0, 176, 80)' : 'black',
        }"
        @click="showingToNewPlayer(name.name)"
      >
        {{ name.name }}
      </p>
    </div>
    <button id="backBtn" @click="back()">Back</button>
    <button id="showCardBtn" @click="showCard()">Show Card</button>
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
  name: "ShowCardView",
  components: {
    CardComponent,
    ModalComponent,
  },
  data: () => ({
    name: "",
    names: [],
    cards: [],
    gameVersion: "",
    pickedCard: "",
    showingTo: "",
    equalsMode: false,
    openModal: false,
    modalFirstText: "",
    modalSecondText: "",
    modalColor: "",
  }),
  computed: {
    iterableNames() {
      const iterableNames = [];

      for (let index = 0; index < this.names.length; index++) {
        const playerName = this.names[index];

        if (playerName !== this.name)
          iterableNames.push({
            id: index,
            name: this.names[index],
          });
      }

      return iterableNames;
    },
    iterableCards() {
      const iterableCards = [];
      const startIndex = this.names.length;

      for (
        let index = startIndex;
        index < this.cards.length + startIndex;
        index++
      ) {
        const cardName = this.cards[index - startIndex];

        iterableCards.push({
          id: index,
          name: cardName,
          borderColor:
            cardName === this.pickedCard ? "rgb(0, 176, 80)" : "black",
        });
      }

      return iterableCards;
    },
    equalsModeOnOrOff() {
      return this.equalsMode ? "On" : "Off";
    },
  },
  methods: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    pickedNewCard(cardName) {
      this.pickedCard = cardName === this.pickedCard ? "" : cardName;
    },
    showingToNewPlayer(playerName) {
      this.showingTo = playerName === this.showingTo ? "" : playerName;
    },
    showCard() {
      if (this.pickedCard === "") {
        this.modalFirstText = "Something went wrong!";
        this.modalSecondText = "You need to pick a card!";
        this.modalColor = "red";
        this.openModal = true;
      } else if (this.showingTo === "") {
        this.modalFirstText = "Something went wrong!";
        this.modalSecondText = "You need to pick a player!";
        this.modalColor = "red";
        this.openModal = true;
      } else {
        this.$socket.emit("showCard", {
          card: this.pickedCard,
          showingTo: this.showingTo,
        });
      }
    },
    back() {
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
    this.$socket.on("names", (names) => {
      this.names = names;
    });

    this.$socket.on("beingShownACard", () => {
      this.$router.push("/getCard");
    });

    this.$socket.on("successfulShow", (card, showingTo) => {
      this.modalFirstText = "Success!";
      this.modalSecondText = `"${card}"" was shown to ${showingTo}`;
      this.modalColor = "rgb(0, 176, 80)";
      this.openModal = true;
    });

    this.$socket.on("unsuccessfulShow", (name) => {
      this.modalFirstText = "Something went wrong!";
      this.modalSecondText = `${name} is not connected to the game!`;
      this.modalColor = "red";
      this.openModal = true;
    });

    this.$socket.on("userDisconnected", (whoDisconnected) => {
      this.modalFirstText = "A user has disconnected!";
      this.modalSecondText = `${whoDisconnected} has left the game`;
      this.modalColor = "rgb(0, 176, 80)";
      this.openModal = true;
    });

    this.$socket.on("userReconnected", (whoReconnected) => {
      this.modalFirstText = "A user has reconnected!";
      this.modalSecondText = `${whoReconnected} has joined the game`;
      this.modalColor = "rgb(0, 176, 80)";
      this.openModal = true;
    });

    this.$socket.on("showCardViewData", (data) => {
      this.names = data.names;
      this.name = data.name;
      this.gameVersion = data.gameVersion;
      this.cards = data.cards;
      this.equalsMode = data.equalsMode;
    });

    this.$socket.emit("getShowCardViewData");
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

#cardShowing,
#showingTo {
  color: white;
  text-align: center;
  font-size: 100%;
}

#showingTo {
  margin-top: 3%;
}

#cardContainer,
#namesContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-items: center;
  align-content: center;
  align-items: center;
}

#cardContainer {
  justify-content: space-around;
}

#namesContainer {
  text-align: center;
  justify-content: space-evenly;
}

.name {
  color: white;
  background-color: rgb(31, 78, 121);
  border-width: 3px;
  border-style: solid;
  cursor: pointer;
  width: 10vw;
  height: 7vh;
  line-height: 6.5vh;
}

#backBtn,
#showCardBtn {
  color: white;
  font-size: 200%;
  border: 3px solid black;
  width: 15%;
  height: 10vh;
  display: inline;
  margin-top: 5%;
}

#backBtn {
  float: left;
  margin-left: 5%;
  background-color: red;
}

#showCardBtn {
  float: right;
  margin-right: 5%;
  background-color: rgb(0, 176, 80);
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

  #cardShowing {
    margin-top: -1%;
  }

  #showingTo {
    margin-top: 1%;
  }

  #backBtn,
  #showCardBtn {
    font-size: 130%;
    margin-top: 2%;
  }
}

/* Mobile */
@media only screen and (max-width: 1000px) {
  #version {
    font-size: 100%;
  }

  #title {
    font-size: 200%;
    margin-top: -7%;
  }

  #gameVersionInfo,
  #equalsModeInfo {
    font-size: 90%;
  }

  #equalsModeInfo {
    margin-top: -4%;
  }

  #cardShowing,
  #showingTo {
    font-size: 90%;
  }

  #showingTo {
    margin-top: 0%;
  }

  .name {
    width: 12vw;
    height: 8vh;
    line-height: 7vh;
  }

  #backBtn,
  #showCardBtn {
    font-size: 120%;
    width: 20%;
    height: 12vh;
    margin-top: 0%;
  }

  #backBtn {
    margin-left: 18%;
  }

  #showCardBtn {
    margin-right: 18%;
  }
}
</style>
