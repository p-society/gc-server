const express = require("express");
const { getTeam, updateTeam, removeTeam } = require("./team.controller");
const teamsRouter = express.Router();

teamsRouter.get("/team", getTeam);

teamsRouter.post("/team", updateTeam);

teamsRouter.delete("/team", removeTeam);

module.exports = teamsRouter;
