package controller

import (
	"encoding/json"
	"net/http"

	"github.com/p-society/gcbs/helper"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetAllPlayers(w http.ResponseWriter, r *http.Request) {
	var allPlayers []primitive.M = helper.Test()
	json.NewEncoder(w).Encode(allPlayers)
}
