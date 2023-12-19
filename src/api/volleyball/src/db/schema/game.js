const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    series: Number,

    home: {
        type: String,
        required: true
    },
    away: {
        type: String,
        required: true
    },

    status: String,
    date: String,
});

const Game = mongoose.model("Game", GameSchema);

module.exports = {
    Game
};
