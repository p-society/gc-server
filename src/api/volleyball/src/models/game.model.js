const { Game } = require("../db/schema/game");

async function getOneGame(id) {
    const game = await Game.findById(id);
    // console.log(game);
    return game;
}

async function getAllGames(series) {
    if (series) 
        return await Game.find({series: series});
    
    return await Game.find();
}

async function saveGame(game) {
    const response = { message: "updated" };

    if(game._id)
        await Game.findByIdAndUpdate(game._id, game);
    else {
        await Game.create(game);
        response.message = "created";
    }

    return response;
}

async function deleteGame(id) {
    await Game.findByIdAndDelete(id);
    return {message: "deleted"};
}

module.exports = {
    getOneGame,
    getAllGames,
    saveGame,
    deleteGame,
}