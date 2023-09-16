const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const {
  addUser,
  removeUser,
  changeUserName,
  changeUserSocket,
  getNamesAndNumOfCards,
  getNames,
  getSocketName,
  getSocketCards,
  connectedUsers,
  getIsHost,
  hasLobbyStarted,
  getGameStarted,
  isGameInProgress,
  removeDisconnectedUsers,
  isRecentPlayer,
  clearUsers,
  clearUserDataButKeepSocket,
  makeFirstConnectedUserHost,
  showUserACard,
  tellInGameUsersOfDisconnect,
  tellInGameUsersOfReconnect,
} = require("./userHandler.js");

const {
  dealCards,
  clearExtras,
  clearAnswer,
  getAnswer,
  getExtras,
} = require("./cardHandler.js");

let gameVersion = "";
let equalsMode = false;
let whoStarts = "";

const currentCardBeingShown = {
  card: "",
  text: "",
};

const cleanGameData = () => {
  whoStarts = "";
  currentCardBeingShown.card = "";
  currentCardBeingShown.text = "";
  clearAnswer();
  clearExtras();
}

const cleanServer = () => {
  gameVersion = "";
  equalsMode = false;
  cleanGameData();
  clearUserDataButKeepSocket();
};

io.on("connection", (socket) => {
  addUser(socket);
  socket.emit("connected");

  socket.on("getHomeViewData", () => {
    socket.emit("homeViewData", {
      names: getNames(),
      isHost: getIsHost(socket),
      lobbyStarted: hasLobbyStarted(),
      gameVersion: gameVersion,
      gameStarted: getGameStarted(),
      equalsMode: equalsMode,
    });
  });

  socket.on("getLobbyViewData", () => {
    if (getSocketName(socket) === "") {
      socket.emit("connected");
    } else {
      socket.emit("lobbyViewData", {
        names: getNames(),
        name: getSocketName(socket),
        gameVersion: gameVersion,
        equalsMode: equalsMode,
      });
    }
  });

  socket.on("getCardsViewData", () => {
    if (getSocketName(socket) === "" || getSocketCards(socket) === []) {
      socket.emit("connected");
    } else {
      socket.emit("cardsViewData", {
        namesAndNumOfCards: getNamesAndNumOfCards(),
        name: getSocketName(socket),
        gameVersion: gameVersion,
        cards: getSocketCards(socket),
        whoStarts: whoStarts,
        extras: getExtras(),
        equalsMode: equalsMode,
      });
    }
  });

  socket.on("getShowCardViewData", () => {
    if (getSocketName(socket) === "" || getSocketCards(socket) === []) {
      socket.emit("connected");
    } else {
      socket.emit("showCardViewData", {
        names: getNames(),
        name: getSocketName(socket),
        gameVersion: gameVersion,
        cards: getSocketCards(socket),
        equalsMode: equalsMode,
      });
    }
  });

  socket.on("getCardViewData", () => {
    if (getSocketName(socket) === "" || getSocketCards(socket) === []) {
      socket.emit("connected");
    } else {
      socket.emit("cardViewData", {
        shownCard: currentCardBeingShown,
        gameVersion: gameVersion,
        equalsMode: equalsMode,
      });
    }
  });

  socket.on("getFinalAccusationViewData", () => {
    if (getSocketName(socket) === "" || getSocketCards(socket) === []) {
      socket.emit("connected");
    } else {
      socket.emit("finalAccusationViewData", {
        answer: getAnswer(),
        gameVersion: gameVersion,
        equalsMode: equalsMode,
      });
    }
  });

  socket.on("createLobby", (data) => {
    gameVersion = data.gameVersion;
    equalsMode = data.equalsMode;
    changeUserName(socket, data.name);

    io.emit("lobbyStateHasChanged", {
      names: getNames(),
      lobbyStarted: true,
      gameVersion: gameVersion,
      equalsMode: equalsMode,
    });
  });

  socket.on("isRecentPlayer", (name) => {
    socket.emit("recentPlayer", isRecentPlayer(name));
  });

  socket.on("playerRejoining", (name) => {
    changeUserSocket(socket, name);
    socket.emit("rejoinGame");
    tellInGameUsersOfReconnect(name);
  });

  socket.on("joinLobby", (name) => {
    changeUserName(socket, name);

    io.emit("names", getNames());
  });

  socket.on("startGame", () => {
    whoStarts = dealCards(gameVersion, equalsMode);
    io.emit("gameStarted", true);
  });

  socket.on("showCard", (data) => {
    currentCardBeingShown.card = data.card;
    currentCardBeingShown.text =
      getSocketName(socket) + " is showing you:";

    showUserACard(data.showingTo, currentCardBeingShown, socket);
  });

  socket.on("lookAtCard", (data) => {
    currentCardBeingShown.card = data.card;
    currentCardBeingShown.text = "The card hiding in " + data.where + ":";
    socket.emit("beingShownACard", currentCardBeingShown);
  });

  socket.on("endGame", () => {
    cleanServer();
    io.emit("connected");
  });

  socket.on("disconnect", () => {
    const socketName = getSocketName(socket);
    const socketCards = getSocketCards(socket);
    removeUser(socket);

    if (connectedUsers().length === 0) {
      clearUsers();
      cleanServer();
    } else {
      if(isGameInProgress()) {
        if (socketCards.length > 0) {
          tellInGameUsersOfDisconnect(socketName);
        }
      } else {
        removeDisconnectedUsers();
        cleanGameData();
      }

      makeFirstConnectedUserHost();
      const lobby = hasLobbyStarted();

      if (!lobby) {
        equalsMode = false;
        gameVersion = "";
      }

      io.emit("lobbyStateHasChanged", {
        names: getNames(),
        lobbyStarted: lobby,
        equalsMode: equalsMode,
        gameVersion: gameVersion,
      });
    }
  });
});

app.get("/", (req, res) => {
  const htmlPath = __dirname + "\\public\\index.html";
  
  res.sendFile(htmlPath);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
