const express = require("express");
const { getGame, updateGame, removeGame } = require("./game.controller");
const gameRouter = express.Router();

gameRouter.get("/game", getGame);

gameRouter.post("/game", updateGame);

gameRouter.delete("/game", removeGame);

module.exports = gameRouter;
