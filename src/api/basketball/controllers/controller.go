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
type RequestBody struct {
	Name      string `json:"name"`
	CollegeID string `json:"college_id"`
}

func UpdateTeamPlayer(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Update Request Incoming.")
	var requestBody RequestBody
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}
	fmt.Println("In Controller,name::", requestBody.Name)
	player,err := helper.GetPlayerByName(requestBody.Name)
	if err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(player)
}
