const { assignCardsToEachPlayer, getNames } = require("./userHandler.js");

const answer = {
  who: "",
  what: "",
  where: "",
};

let extras = [];

const giftWhoCards = [
  "Quackers",
  "Lilypad",
  "Crazy",
  "Goose",
  "Ray Ray",
  "Cozy",
];
const giftWhatCards = [
  "Banana",
  "Goggles",
  "The Key",
  "Pencil",
  "Batarang",
  "Rubix Cube",
];
const giftWhereCards = [
  "Master Bedroom",
  "Playroom",
  "Omer's Room",
  "Dining Room",
  "Living Room",
  "The Kitchen",
  "Roy's Room",
  "Noya's Room",
  "The Office",
];

const clueWhoCards = [
  "Green",
  "Mustard",
  "Peacock",
  "Plum",
  "Scarlet",
  "Orchid",
];
const clueWhatCards = [
  "Candlestick",
  "Dagger",
  "Revolver",
  "Lead Pipe",
  "Rope",
  "Wrench",
];
const clueWhereCards = [
  "Conservatory",
  "Ballroom",
  "Kitchen",
  "Dining Room",
  "Lounge",
  "Hall",
  "Study",
  "Library",
  "Billiard Room",
];

const getWhoCards = (gameVersion) => {
  let whoCardsTemp = [];

  switch (gameVersion) {
    case "gift":
      whoCardsTemp = [...giftWhoCards];

      break;
    case "clue":
    default:
      whoCardsTemp = [...clueWhoCards];
  }

  const whoCards = [];

  whoCardsTemp.forEach((card) => {
    whoCards.push({
      card,
      type: "who",
    });
  });

  return whoCards;
};

const getWhatCards = (gameVersion) => {
  let whatCardsTemp = [];

  switch (gameVersion) {
    case "gift":
      whatCardsTemp = [...giftWhatCards];

      break;
    case "clue":
    default:
      whatCardsTemp = [...clueWhatCards];
  }

  const whatCards = [];

  whatCardsTemp.forEach((card) => {
    whatCards.push({
      card,
      type: "what",
    });
  });

  return whatCards;
};

const getWhereCards = (gameVersion) => {
  let whereCardsTemp = [];

  switch (gameVersion) {
    case "gift":
      whereCardsTemp = [...giftWhereCards];

      break;
    case "clue":
    default:
      whereCardsTemp = [...clueWhereCards];
  }

  const whereCards = [];

  whereCardsTemp.forEach((card) => {
    whereCards.push({
      card,
      type: "where",
    });
  });

  return whereCards;
};

const createExtraCards = (gameVersion, extraCards, cards) => {
  const whereCards = getWhereCards(gameVersion);

  for (let index = 0; index < extraCards; index++) {
    extras.push({
      card: cards.splice(Math.floor(Math.random() * cards.length), 1)[0].card,
      where: whereCards.splice(
        Math.floor(Math.random() * whereCards.length),
        1
      )[0].card,
    });
  }
};

const generateRandomUsersToHaveExtraCards = (extraCards, numOfPlayers) => {
  const playersWithExtraCards = [];

  for (let index = 0; index < extraCards; index++) {
    let randomPlayer = Math.floor(Math.random() * numOfPlayers);

    while (playersWithExtraCards.includes(randomPlayer)) {
      randomPlayer = Math.floor(Math.random() * numOfPlayers);
    }

    playersWithExtraCards.push(randomPlayer);
  }

  return playersWithExtraCards;
};

const sortCardsByType = (dealtCards) => {
  const sortedDealtCards = [];

  dealtCards.forEach((userCards) => {
    const userWhoCards = [...userCards]
      .filter((card) => card.type === "who")
      .map((card) => card.card);
    const userWhatCards = [...userCards]
      .filter((card) => card.type === "what")
      .map((card) => card.card);
    const userWhereCards = [...userCards]
      .filter((card) => card.type === "where")
      .map((card) => card.card);
      
    const sortedUserCards = userWhoCards.concat(userWhatCards, userWhereCards);
    sortedDealtCards.push(sortedUserCards);
  });

  return sortedDealtCards;
};

const dealCardsToEachPlayer = (
  cards,
  numOfPlayers,
  equalsMode,
  gameVersion
) => {
  const cardsForEachPlayer = Math.floor(cards.length / numOfPlayers);
  const dealtCards = [];

  for (let index = 0; index < numOfPlayers; index++) {
    const playerCards = [];

    for (let cardNum = 0; cardNum < cardsForEachPlayer; cardNum++) {
      playerCards.push(
        cards.splice(Math.floor(Math.random() * cards.length), 1)[0]
      );
    }

    dealtCards.push(playerCards);
  }

  const extraCards = cards.length;

  if (equalsMode) {
    createExtraCards(gameVersion, extraCards, cards);
  } else {
    const playersWithExtraCards = generateRandomUsersToHaveExtraCards(
      extraCards,
      numOfPlayers
    );

    playersWithExtraCards.forEach((player) => {
      dealtCards[player].push(
        cards.splice(Math.floor(Math.random() * cards.length), 1)[0]
      );
    });
  }

  const sortedDealtCards = sortCardsByType(dealtCards);
  assignCardsToEachPlayer(sortedDealtCards);
};

const dealCards = (gameVersion, equalsMode) => {
  const whoCards = getWhoCards(gameVersion);
  const whatCards = getWhatCards(gameVersion);
  const whereCards = getWhereCards(gameVersion);

  answer.who = whoCards.splice(
    Math.floor(Math.random() * whoCards.length),
    1
  )[0].card;
  answer.what = whatCards.splice(
    Math.floor(Math.random() * whatCards.length),
    1
  )[0].card;
  answer.where = whereCards.splice(
    Math.floor(Math.random() * whereCards.length),
    1
  )[0].card;

  const cards = whoCards.concat(whatCards, whereCards);
  const playerNames = getNames();
  const numOfPlayers = playerNames.length;

  dealCardsToEachPlayer(cards, numOfPlayers, equalsMode, gameVersion);

  return playerNames[Math.floor(Math.random() * numOfPlayers)];
};

const clearExtras = () => {
  extras = [];
};

const clearAnswer = () => {
  answer.who = "";
  answer.what = "";
  answer.where = "";
};

const getAnswer = () => {
  return answer;
};

const getExtras = () => {
  return extras;
};

module.exports = { dealCards, clearExtras, clearAnswer, getAnswer, getExtras };
