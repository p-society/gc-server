const { request, response } = require("express");
const {
    getOneGame,
    getAllGames,
    saveGame,
    deleteGame
} = require("../../models/game.model");

/**@param {request} req @param {response} res*/
async function getGame(req, res) {
    const id = req.query.id;
    if (id) {
        const game = await getOneGame(id);
        res.json(game);
    } else {
        const games = await getAllGames(req.query.series);
        res.json(games);
    }
}

/**@param {request} req @param {response} res*/
async function updateGame(req, res) {
    const game = req.body;

    if (game.name && game.home && game.away) {
        res.json(await saveGame(game));
    } else {
        res.status(401).send("name, home and away are required");
    }
}

/**@param {request} req @param {response} res*/
async function removeGame(req, res) {
    const id = req.body._id;
    const msg = await deleteGame(id);
    res.json(msg);
}

module.exports = {
    getGame,
    updateGame,
    removeGame,
};
