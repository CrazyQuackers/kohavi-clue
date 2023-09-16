<template>
  <div>
    <p id="gameVersionInfo">* Game Version: {{ capitalize(gameVersion) }}</p>
    <p id="version">V.1.0</p>
    <p id="equalsModeInfo">* Equals Mode: {{ equalsModeOnOrOff }}</p>
    <h1 id="title">KOHAVI CLUE</h1>
    <div v-if="!isSure">
      <p id="action" class="whiteColor center big">{{ action }}</p>
      <p class="whiteColor center medium">{{ areYouSureMessage }}</p>
      <button class="btn areYou left" @click="backClick()">Back</button>
      <button class="btn areYou right" @click="continueClick()">
        {{ continueBtn }}
      </button>
    </div>
    <div v-else>
      <p id="theCorrectAnswerIs" class="whiteColor center medium">
        The correct answer is:
      </p>
      <div id="answerContainer">
        <card-component
          v-for="card in iterableCards"
          :key="card.id"
          :card-name="card.name"
          :game-version="gameVersion"
          :clickable="false"
        />
      </div>
      <div class="divBtn regular left" @click="backClick()">
        <p class="whiteColor center medium underline goDown">
          If you were incorrect:
        </p>
        <p class="whiteColor center small goUp">
          Don't tell the other players the answer!
        </p>
        <p class="whiteColor center small goUp">Keep showing players your cards.</p>
      </div>
      <div class="divBtn regular right" @click="continueClick()">
        <p class="whiteColor center medium underline goDown">
          If you were correct:
        </p>
        <p class="whiteColor center small goUp">
          Congradulations! You won the game!
        </p>
        <p class="whiteColor center small goUp">When you are ready, end the game.</p>
      </div>
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
  name: "FinalAccusationView",
  components: {
    CardComponent,
    ModalComponent,
  },
  data: () => ({
    isSure: false,
    endGame: false,
    answer: {
      who: "",
      what: "",
      where: "",
    },
    gameVersion: "",
    equalsMode: false,
    openModal: false,
    modalFirstText: "",
    modalSecondText: "",
    modalColor: "",
  }),
  computed: {
    iterableCards() {
      const iterableCards = [];

      iterableCards.push({
        id: 0,
        name: this.answer.who,
      });

      iterableCards.push({
        id: 1,
        name: this.answer.what,
      });

      iterableCards.push({
        id: 2,
        name: this.answer.where,
      });

      return iterableCards;
    },
    equalsModeOnOrOff() {
      return this.equalsMode ? "On" : "Off";
    },
    action() {
      return this.endGame
        ? "You are about to end the game and kick everyone out"
        : "You are about to view the answer of the game";
    },
    areYouSureMessage() {
      return this.endGame
        ? "Only end the game if you have won the game."
        : "Are you sure you want to continue?";
    },
    continueBtn() {
      return this.endGame ? "End Game" : "Continue";
    },
    answerText() {
      return (
        this.answer.who + ", " + this.answer.what + ", " + this.answer.where
      );
    },
  },
  methods: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    backClick() {
      if (this.isSure || !this.endGame) this.$router.push("/cards");
      else {
        this.isSure = true;
        this.endGame = false;
      }
    },
    continueClick() {
      if (this.isSure) {
        this.isSure = false;
        this.endGame = true;
      } else if (!this.endGame) this.isSure = true;
      else this.$socket.emit("endGame");
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

    this.$socket.on("finalAccusationViewData", (data) => {
      this.answer = data.answer;
      this.gameVersion = data.gameVersion;
      this.equalsMode = data.equalsMode;
    });

    this.$socket.emit("getFinalAccusationViewData");
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

.whiteColor {
  color: white;
}

.redColor {
  color: red;
}

.greenColor {
  color: rgb(0, 176, 80);
}

.center {
  text-align: center;
}

.big {
  font-size: 180%;
}

.medium {
  font-size: 140%;
}

.small {
  font-display: 120%;
}

.underline {
  text-decoration: underline;
}

#answerContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  justify-items: center;
  align-content: center;
  align-items: center;
}

#theCorrectAnswerIs {
  margin-top: 4%;
  margin-bottom: 2%;
}

#action {
  margin-top: 12%;
}

.btn {
  color: white;
  font-size: 200%;
  border: 3px solid black;
  width: 15%;
  height: 10vh;
  display: inline;
}

.divBtn {
  border: 3px solid black;
  width: 25%;
  height: 15vh;
  display: inline;
  cursor: pointer;
}

.left {
  float: left;
  margin-left: 5%;
  background-color: red;
}

.right {
  float: right;
  margin-right: 5%;
  background-color: rgb(0, 176, 80);
}

.regular {
  margin-top: 7%;
}

.goDown {
  margin-top: 2%;
}

.areYou {
  margin-top: 18%;
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

  #theCorrectAnswerIs {
    margin-top: -1%;
    margin-bottom: 3%;
  }

  #action {
    margin-top: 10%;
  }

  .divBtn {
    width: 35%;
    height: 20vh;
  }

  .btn {
    font-size: 130%;
  }

  .areYou {
    margin-top: 15%;
  }

  .goDown {
    margin-top: 0%;
  }

  .regular {
    margin-top: 3%;
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

  .big {
    font-size: 150%;
  }

  .medium {
    font-size: 120%;
  }

  .small {
    font-size: 75%;
  }

  #action {
    margin-top: 10%;
  }

  .regular {
    margin-top: 0%;
  }

  .areYou {
    margin-top: 9%;
  }

  .divBtn {
    width: 40%;
    height: 22vh;
  }

  .goUp {
    margin-top: -3%;
  }
}
</style>
