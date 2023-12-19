const { request, response } = require("express");
const {
    getOneTeam,
    getAllTeams,
    saveTeam,
    deleteTeam,
} = require("../../models/team.model");

/**@param {request} req @param {response} res*/
async function getTeam(req, res) {
    const id = req.query.id;
    if (id) {
        const team = await getOneTeam(id);
        res.json(team);
    } else {
        const teams = await getAllTeams();
        res.json(teams);
    }
}

/**@param {request} req @param {response} res*/
async function updateTeam(req, res) {
    const team = req.body;

    if (team.name) {
        res.json(await saveTeam(team));
    } else {
        res.status(401).send("team name is required");
    }
}

/**@param {request} req @param {response} res*/
async function removeTeam(req, res) {
    const id = req.body._id;
    const msg = await deleteTeam(id);
    res.json(msg);
}

module.exports = {
    getTeam,
    updateTeam,
    removeTeam,
};
