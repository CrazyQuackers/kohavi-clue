import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "./src/views/HomeView.vue";
import LobbyView from "./src/views/LobbyView.vue";
import CardsView from "./src/views/CardsView.vue";
import ShowCardView from "./src/views/ShowCardView.vue";
import GetCardView from "./src/views/GetCardView.vue";
import FinalAccusationView from "./src/views/FinalAccusationView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/lobby",
    name: "lobby",
    component: LobbyView,
  },
  {
    path: "/cards",
    name: "cards",
    component: CardsView,
  },
  {
    path: "/showCard",
    name: "showCard",
    component: ShowCardView,
  },
  {
    path: "/getCard",
    name: "getCard",
    component: GetCardView,
  },
  {
    path: "/finalAccusation",
    name: "finalAccusation",
    component: FinalAccusationView,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const originalPush = router.push;
const originalReplace = router.replace;
let currentErr = "";

router.push = function push(location, onComplete, onAbort) {
  return originalPush
    .call(this, location, onComplete, onAbort)
    .catch((err) => {if (currentErr) currentErr = err});
};

router.replace = function replace(location, onComplete, onAbort) {
  return originalReplace
    .call(this, location, onComplete, onAbort)
    .catch((err) => currentErr = err);
};

export default router;
