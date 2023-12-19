const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    players: [
        {
            name: String,
            role: String,
        },
    ],
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = {
    Team,
    TeamSchema,
};
