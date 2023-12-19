const { Team } = require("../db/schema/Team");

async function getOneTeam(id) {
    const team = await Team.findById(id);
    console.log(team);
    return team;
}

async function getAllTeams() {
    const teams  = await Team.find({}, {name: 1});
    return teams;
}

async function saveTeam(team) {
    let temp = await Team.findOneAndUpdate({name: team.name}, team);

    if(!temp) {
        await Team.create(team);
    }

    return team;
}

async function deleteTeam(id) {
    await Team.findByIdAndDelete(id);
    return {message: "deleted"};
}

module.exports = {
    getOneTeam,
    getAllTeams,
    saveTeam,
    deleteTeam,
}