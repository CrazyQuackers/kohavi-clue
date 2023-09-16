<template>
  <div>
    <p id="gameVersionInfo">* Game Version: {{ capitalize(gameVersion) }}</p>
    <p id="version">V.1.0</p>
    <p id="equalsModeInfo">* Equals Mode: {{ equalsModeOnOrOff }}</p>
    <h1 id="title">KOHAVI CLUE</h1>
    <p
      v-for="nameAndCards in iterableNamesAndNumOfCards"
      :key="nameAndCards.id"
      class="nameAndCardsText"
    >
      {{ nameHasNumCards(nameAndCards) }}
    </p>
    <p id="whoStarts">{{ whoStartsMessage }}</p>
    <p id="yourCards">Your Cards</p>
    <div id="cardContainer">
      <card-component
        v-for="card in iterableCards"
        :key="card.id"
        :card-name="card.name"
        :game-version="gameVersion"
        :clickable="false"
      />
    </div>
    <button id="showCardBtn" @click="showCard()" :class="howManyPlayersClass">
      Show player a card
    </button>
    <button
      v-for="extra in iterableExtras"
      :key="extra.id"
      @click="lookAtCard(extra.card, extra.where)"
      class="extraCard"
      :class="howManyPlayersClass"
    >
      {{ viewCardText(extra.where) }}
    </button>
    <button
      id="accusationBtn"
      :class="howManyPlayersClass"
      @click="finalAccusation()"
    >
      Final Accusation
    </button>
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
  name: "CardsView",
  components: {
    CardComponent,
    ModalComponent,
  },
  data: () => ({
    name: "",
    namesAndNumOfCards: [],
    cards: [],
    gameVersion: "",
    whoStarts: "",
    extras: [],
    equalsMode: false,
    openModal: false,
    modalFirstText: "",
    modalSecondText: "",
    modalColor: "",
  }),
  computed: {
    howManyPlayersClass() {
      return "players-" + this.iterableNamesAndNumOfCards.length;
    },
    iterableNamesAndNumOfCards() {
      const iterableNamesAndNumOfCards = [];

      for (let index = 0; index < this.namesAndNumOfCards.length; index++) {
        const current = this.namesAndNumOfCards[index];
        const currentName = current.name;

        if (currentName !== this.name)
          iterableNamesAndNumOfCards.push({
            id: index,
            name: currentName,
            numOfCards: current.numOfCards,
          });
      }

      return iterableNamesAndNumOfCards;
    },
    iterableCards() {
      const iterableCards = [];
      const startIndex = this.namesAndNumOfCards.length;

      for (
        let index = startIndex;
        index < this.cards.length + startIndex;
        index++
      ) {
        iterableCards.push({
          id: index,
          name: this.cards[index - startIndex],
        });
      }

      return iterableCards;
    },
    iterableExtras() {
      const iterableExtras = [];
      const startIndex = this.namesAndNumOfCards.length + this.cards.length;

      for (
        let index = startIndex;
        index < this.extras.length + startIndex;
        index++
      ) {
        const extra = this.extras[index - startIndex];

        iterableExtras.push({
          id: index,
          card: extra.card,
          where: extra.where,
        });
      }

      return iterableExtras;
    },
    whoStartsMessage() {
      return this.whoStarts + " starts";
    },
    equalsModeOnOrOff() {
      return this.equalsMode ? "On" : "Off";
    },
  },
  methods: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    nameHasNumCards(nameAndCards) {
      return nameAndCards.name + " has " + nameAndCards.numOfCards + " cards";
    },
    showCard() {
      this.$router.push("/showCard");
    },
    finalAccusation() {
      this.$router.push("/finalAccusation");
    },
    viewCardText(where) {
      return "View card hiding in " + where;
    },
    lookAtCard(card, where) {
      this.$socket.emit("lookAtCard", {
        card,
        where,
      });
    },
    closeModal() {
      this.openModal = false;
      this.modalFirstText = "";
      this.modalSecondText = "";
      this.modalColor = "";
    },
  },
  mounted() {
    this.$socket.on("beingShownACard", () => {
      this.$router.push("/getCard");
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

    this.$socket.on("cardsViewData", (data) => {
      this.namesAndNumOfCards = data.namesAndNumOfCards;
      this.name = data.name;
      this.gameVersion = data.gameVersion;
      this.cards = data.cards;
      this.whoStarts = data.whoStarts;
      this.extras = data.extras;
      this.equalsMode = data.equalsMode;
    });

    this.$socket.emit("getCardsViewData");
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

.nameAndCardsText {
  color: white;
  font-size: 100%;
  margin-left: 1%;
  margin-top: -1%;
}

#whoStarts {
  color: white;
  font-size: 100%;
  text-align: right;
  margin-right: 1%;
  margin-top: -5%;
}

#yourCards {
  color: white;
  font-size: 100%;
  text-align: center;
  margin-top: 4%;
}

#cardContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  justify-items: center;
  align-content: center;
  align-items: center;
}

.extraCard {
  font-size: 150%;
  background-color: rgb(0, 145, 255);
  margin-left: 4%;
}

#showCardBtn,
#accusationBtn {
  font-size: 200%;
  background-color: rgb(0, 176, 80);
}

.extraCard,
#showCardBtn,
#accusationBtn {
  color: white;
  border: 3px solid black;
  width: 15%;
  height: 10vh;
  display: inline;
  margin-top: 8%;
}

#showCardBtn {
  float: left;
  margin-left: 5%;
}

#accusationBtn {
  float: right;
  margin-right: 5%;
}

.players-2 {
  margin-top: 10% !important;
}

.players-3 {
  margin-top: 9% !important;
}

.players-4 {
  margin-top: 8% !important;
}

.players-5 {
  margin-top: 7% !important;
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

  #yourCards {
    margin-top: -2%;
  }

  .extraCard,
  #showCardBtn,
  #accusationBtn {
    margin-top: 5%;
  }

  .extraCard {
    font-size: 100%;
  }

  #showCardBtn,
  #accusationBtn {
    font-size: 130%;
  }

  .players-2 {
    margin-top: 9% !important;
  }

  .players-3 {
    margin-top: 7% !important;
  }

  .players-4 {
    margin-top: 5% !important;
  }

  .players-5 {
    margin-top: 3% !important;
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

  .nameAndCardsText {
    font-size: 90%;
    margin-left: 5%;
    margin-top: -2%;
  }

  #whoStarts {
    font-size: 90%;
    margin-right: 5%;
    margin-top: -7%;
  }

  #yourCards {
    font-size: 90%;
    margin-top: -3%;
  }

  .players-2 {
    margin-top: 5% !important;
  }

  .players-3 {
    margin-top: 2.5% !important;
  }

  .players-4 {
    margin-top: 0% !important;
  }

  .players-5 {
    margin-top: -2.5% !important;
  }

  .extraCard {
    font-size: 90%;
    margin-left: 3.5%;
  }

  #showCardBtn,
  #accusationBtn {
    font-size: 120%;
  }

  .extraCard,
  #showCardBtn,
  #accusationBtn {
    width: 17%;
    height: 15vh;
  }

  #showCardBtn {
    margin-left: 1%;
  }

  #accusationBtn {
    margin-right: 1%;
  }
}
</style>
