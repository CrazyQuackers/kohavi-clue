let users = [];

const addUser = (socket) => {
  users.push({
    socket: socket,
    name: "",
    cards: [],
  });
};

const removeUser = (socket) => {
  let removeUser = false;

  users.forEach((user) => {
    if (user.socket && user.socket.id === socket.id) {
      if (user.cards.length === 0) removeUser = true;
      else user.socket = null;
    }
  });

  if (removeUser)
    users = users.filter((user) => (user.socket && user.socket.id !== socket.id) || !user.socket);
};

const changeUserName = (socket, name) => {
  users.forEach((user) => {
    if (user.socket && user.socket.id === socket.id) user.name = name;
  });
};

const changeUserSocket = (socket, name) => {
  users = users.filter(
    (user) => (user.socket && user.socket.id !== socket.id) || !user.socket
  );

  users.forEach((user) => {
    if (user.name === name) {
      user.socket = socket;
    }
  });
};

const getNamesAndNumOfCards = () => {
  const namesAndNumOfCards = [];

  users.forEach((user) => {
    if (user.name !== "")
      namesAndNumOfCards.push({
        name: user.name,
        numOfCards: user.cards.length,
      });
  });

  return namesAndNumOfCards;
};

const getNames = () => {
  const names = [];

  users.forEach((user) => {
    if (user.name !== "") names.push(user.name);
  });

  return names;
};

const getSocketName = (socket) => {
  let socketName = "";

  users.forEach((user) => {
    if (user.socket && user.socket.id === socket.id) {
      socketName = user.name;
    }
  });

  return socketName;
};

const getSocketCards = (socket) => {
  let socketCards = [];

  users.forEach((user) => {
    if (user.socket && user.socket.id === socket.id) {
      socketCards = user.cards;
    }
  });

  return socketCards;
};

const connectedUsers = () => {
  return [...users].filter((user) => user.socket);
};

const getIsHost = (socket) => {
  let foundFirst = false;
  let isHost = false;

  users.forEach((user) => {
    if (user.socket && !foundFirst) {
      foundFirst = true;
      isHost = user.socket.id === socket.id;
    }
  });

  return isHost;
};

const hasLobbyStarted = () => {
  let foundFirst = false;
  let lobbyStarted = false;

  users.forEach((user) => {
    if (user.socket && !foundFirst) {
      foundFirst = true;
      lobbyStarted = user.name !== "";
    }
  });

  return lobbyStarted;
};

const getGameStarted = () => {
  let foundFirst = false;
  let gameStarted = false;

  users.forEach((user) => {
    if (user.socket && !foundFirst) {
      foundFirst = true;
      gameStarted = user.cards.length > 0;
    }
  });

  return gameStarted;
};

const isGameInProgress = () => {
  let isGameInProgress = false;

  users.forEach((user) => {
    if (user.cards.length !== 0 && user.socket) isGameInProgress = true;
  });

  return isGameInProgress;
};

const removeDisconnectedUsers = () => {
  users = users.filter((user) => user.socket);
};

const isRecentPlayer = (name) => {
  let recentPlayer = false;

  users.forEach((user) => {
    if (user.name === name && !user.socket) {
      recentPlayer = true;
    }
  });

  return recentPlayer;
};

const assignCardsToEachPlayer = (dealtCards) => {
  let currentPlayer = 0;

  users.forEach((user) => {
    if (user.name !== "") {
      user.cards = dealtCards[currentPlayer];
      currentPlayer++;
    }
  });
};

const clearUsers = () => {
  users = [];
};

const clearUserDataButKeepSocket = () => {
  users.forEach((user) => {
    user.name = "";
    user.cards = [];
  });
};

const makeFirstConnectedUserHost = () => {
  let foundFirst = false;

  users.forEach((user) => {
    if (user.socket && !foundFirst) {
      user.socket.emit("isHost", true);
      foundFirst = true;
    }
  });
};

const showUserACard = (showingTo, currentCardBeingShown, socket) => {
  users.forEach((user) => {
    if (user.name === showingTo) {
      if (user.socket) {
        user.socket.emit("beingShownACard", currentCardBeingShown);
        socket.emit("successfulShow", currentCardBeingShown.card, showingTo);
      } else socket.emit("unsuccessfulShow", user.name);
    }
  });
};

const tellInGameUsersOfDisconnect = (whoDisonnected) => {
  users.forEach((user) => {
    if (user.socket && user.cards.length > 0) {
      user.socket.emit("userDisconnected", whoDisonnected);
    }
  });
};

const tellInGameUsersOfReconnect = (whoReconnected) => {
  users.forEach((user) => {
    if (user.socket && user.cards.length > 0 && user.name !== whoReconnected) {
      user.socket.emit("userReconnected", whoReconnected);
    }
  });
};

module.exports = {
  assignCardsToEachPlayer,
  getNames,
  getGameStarted,
  getIsHost,
  getNamesAndNumOfCards,
  getSocketCards,
  getSocketName,
  isRecentPlayer,
  isGameInProgress,
  removeDisconnectedUsers,
  hasLobbyStarted,
  connectedUsers,
  addUser,
  removeUser,
  changeUserName,
  changeUserSocket,
  clearUsers,
  clearUserDataButKeepSocket,
  makeFirstConnectedUserHost,
  showUserACard,
  tellInGameUsersOfDisconnect,
  tellInGameUsersOfReconnect,
};
