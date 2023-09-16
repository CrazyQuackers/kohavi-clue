<template>
  <div v-if="openModal" id="myModal" class="modal">
    <div class="modal-content" :style="{ 'background-color': color }">
      <span class="close" @click="closeModal()">&times;</span>
      <p class="modalText">{{ firstMessage }}</p>
      <p class="modalText">{{ secondMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: ["openModal", "firstMessage", "secondMessage", "color"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 8%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  margin: auto;
  line-height: 5vh;
  border: 3px solid black;
  width: 40%;
  height: 10vh;
}

.modalText {
  color: white;
  margin-left: 3%;
}

.modalText:last-child {
  margin-top: -4%;
}

.close {
  color: white;
  float: right;
  margin-right: 3%;
  margin-top: 2.5%;
  font-size: 200%;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Laptops */
@media only screen and (max-width: 1300px) {
  .modal {
    padding-top: 5%;
  }
}

/* Mobile */
@media only screen and (max-width: 1000px) {
  .modal {
    padding-top: 7.5%;
  }

  .modal-content {
    line-height: 7.5vh;
    width: 50%;
    height: 15vh;
  }

  .modalText {
    font-size: 90%;
  }

  .modalText:last-child {
    margin-top: -5%;
  }

  .close {
    color: white;
    margin-right: 3%;
    margin-top: 3%;
    font-size: 200%;
  }
}
</style>
