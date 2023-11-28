package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/p-society/gcbs/helper"
	playerModel "github.com/p-society/gcbs/model"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetTeamWisePlayers(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	team := queryParams.Get("team")

	if team == "" {
		log.Fatal("Team Is empty.Registration Declined.")
	}

	fmt.Println("team: ", team)
	allPlayers := helper.TeamWisePlayers(team)
	json.NewEncoder(w).Encode(allPlayers)
}

func UploadTeamPlayer(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request Incoming")
	var player playerModel.Player
	_ = json.NewDecoder(r.Body).Decode(&player)
	fmt.Println("player", player)
	insertedVal := helper.UploadTeamPlayer(player)

	var res = map[string]*mongo.InsertOneResult{
		"inserted": insertedVal,
	}

	json.NewEncoder(w).Encode(res)
}

func UpdateTeamPlayer(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Update Request Incoming.")
	var updatePlayer playerModel.Player
	_ = json.NewDecoder(r.Body).Decode(&updatePlayer)

	res := map[string]interface{}{}

	for key, val := range map[string]interface{}{
		"Name":      updatePlayer.Name,
		"ID":        updatePlayer.ID,
		"ImageLink": updatePlayer.ImageLink,
		"Position":  updatePlayer.Position,
		"Branch":    updatePlayer.Branch,
		"Year":      updatePlayer.Year,
		"Age":       updatePlayer.Age,
		"Instagram": updatePlayer.Instagram,
		"Minutes":   updatePlayer.Minutes,
		"Rebounds":  updatePlayer.Rebounds,
		"Assists":   updatePlayer.Assists,
		"Points":    updatePlayer.Points,
	} {
		if val == 0 || val == "" {
			continue
		}
		res[key] = val
	}

	json.NewEncoder(w).Encode(updatePlayer)
}
