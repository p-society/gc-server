const mongoose = require("mongoose");

const ScorecardSchema = new mongoose.Schema({
    id: Number,
    home: String,
    away: String,
    set1: {
        home: Number,
        away: Number
    },
    set2: {
        home: Number,
        away: Number
    },
    set3: {
        home: Number,
        away: Number
    },
    set4: {
        home: Number,
        away: Number
    },
    set5: {
        home: Number,
        away: Number
    },
});

const Scorecard = mongoose.model("Scorecard", ScorecardSchema);

module.exports = {
    Scorecard,
    ScorecardSchema
};
