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
