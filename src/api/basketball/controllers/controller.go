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
	fmt.Println("player points ::", player.Points)
	insertedVal := helper.UploadTeamPlayer(player)

	var res = map[string]*mongo.InsertOneResult{
		"inserted": insertedVal,
	}

	json.NewEncoder(w).Encode(res)
}

func UpdateTeamPlayer(w http.ResponseWriter, r *http.Request) {

	var requestBody struct {
		Name            string `json:"name"`
		IncrementPoint  int    `json:"incrementPoint"`
		IncrementAssist int    `json:"incrementAssist"`
	}

	err := json.NewDecoder(r.Body).Decode(&requestBody)
	fmt.Println(requestBody)

	if err != nil {
		http.Error(w, "Error decoding request body: "+err.Error(), http.StatusBadRequest)
		return
	}
	player, err := helper.GetPlayerByName(requestBody.Name)

	if err != nil {
		http.Error(w, "Error fetching player from the database: "+err.Error(), http.StatusInternalServerError)
		return
	}
	player = helper.IncrementPlayerStats(player, requestBody)
	updatedPlayer := helper.UpdateTeamPlayer(player)

	json.NewEncoder(w).Encode(updatedPlayer)
}
