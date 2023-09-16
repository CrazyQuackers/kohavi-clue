<template>
  <div class="card">
    <img
      v-if="cardName === 'Quackers'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/quackers.png"
      alt="Quackers Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Lilypad'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/lilypad.png"
      alt="Lilypad Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Crazy'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/crazy.png"
      alt="Crazy Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Goose'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/goose.png"
      alt="Goose Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Ray Ray'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/rayray.png"
      alt="Ray Ray Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Cozy'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/cozy.png"
      alt="Cozy Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Banana'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/banana.png"
      alt="Banana Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Goggles'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/goggles.png"
      alt="Goggles Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'The Key'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/the key.png"
      alt="The Key Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Pencil'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/pencil.png"
      alt="Pencil Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Batarang'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/batarang.png"
      alt="Batarang Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Rubix Cube'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/rubix cube.png"
      alt="Rubix Cube Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Master Bedroom'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/masterBedroom.png"
      alt="Master Bedroom Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Playroom'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/playroom.png"
      alt="Playroom Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === `Omer's Room`"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/omerRoom.png"
      alt="Omer's Room Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === `Dining Room` && gameVersion === 'gift'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/diningRoom.png"
      alt="Dining Room Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === `Living Room`"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/livingRoom.png"
      alt="Living Room Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === `The Kitchen`"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/kitchen.png"
      alt="The Kitchen Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === `Roy's Room`"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/royRoom.png"
      alt="Roy's Room Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === `Noya's Room`"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/noyaRoom.png"
      alt="Noya's Room Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === `The Office`"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/gift/office.png"
      alt="The Office Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Green'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/green.png"
      alt="Green Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Mustard'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/mustard.png"
      alt="Mustard Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Peacock'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/peacock.png"
      alt="Peacock Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Plum'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/plum.png"
      alt="Plum Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Scarlet'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/scarlet.png"
      alt="Scarlet Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Orchid'"
      class="cardImage person"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/orchid.png"
      alt="Orchid Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Candlestick'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/candlestick.png"
      alt="Candlestick Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Dagger'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/dagger.png"
      alt="Dagger Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Revolver'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/revolver.png"
      alt="Revolver Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Lead Pipe'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/leadPipe.png"
      alt="Lead Pipe Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Rope'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/rope.png"
      alt="Rope Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Wrench'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/wrench.png"
      alt="Wrench Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Conservatory'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/conservatory.png"
      alt="Conservatory Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Ballroom'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/ballroom.png"
      alt="Ballroom Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Kitchen'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/kitchen.png"
      alt="Kitchen Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Dining Room'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/diningRoom.png"
      alt="Dining Room Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Lounge'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/lounge.png"
      alt="Lounge Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Hall'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/hall.png"
      alt="Hall Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Study'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/study.png"
      alt="Study Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Library'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/library.png"
      alt="Library Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else-if="cardName === 'Billiard Room'"
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/clue/billiardRoom.png"
      alt="Billiard Room Image"
      :style="{
        'border-color': cardBorderColor,
      }"
      @click="clicked()"
    />
    <img
      v-else
      class="cardImage"
      :class="clickable ? 'clickableCard' : 'unclickableCard'"
      src="../images/question mark.png"
      alt="Image Not Found"
      :style="{
        'border-color': cardBorderColor,
      }"
    />
    <p class="cardName">{{ cardName }}</p>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: ["cardName", "gameVersion", "borderColor", "clickable"],
  computed: {
    cardBorderColor() {
      return this.borderColor ? this.borderColor : "black";
    },
  },
  methods: {
    clicked() {
      this.$emit("picked-card");
    },
  },
};
</script>

<style scoped>
.card {
  text-align: center;
}

.cardImage {
  display: inline;
  border-style: solid;
  border-width: 3px;
  background-color: rgb(237, 125, 49);
  width: 11vw;
  height: 30vh;
}

.clickableCard {
  cursor: pointer;
}

.cardName {
  color: white;
  font-size: 150%;
}

.person {
  background-color: rgb(31, 78, 121);
}

/* Laptops */
@media only screen and (max-width: 1300px) {
}

/* Mobile */
@media only screen and (max-width: 1000px) {
  .cardName {
    font-size: 90%;
  }
}
</style>
