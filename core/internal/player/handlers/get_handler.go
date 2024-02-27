package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/p-society/gc-server/core/internal/db"
	errors "github.com/p-society/gc-server/errors/pkg"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var (
		reqBody map[string]interface{}
		filters map[string]interface{}
	)

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		defer r.Body.Close()
		errors.SendErrorJson(w, err)
		return
	}

	filters = bson.M{}

	if sport, ok := reqBody["sport"]; ok {
		filters["sport"] = sport
	}
	if branch, ok := reqBody["branch"]; ok {
		filters["branch"] = branch
	}

	cursor, err := db.PlayerCollection.Find(r.Context(), filters)
	if err != nil {
		panic(err)
	}

	var results []primitive.M

	for cursor.Next(r.Context()) {
		var res bson.M
		if err := cursor.Decode(&res); err != nil {
			panic(err)
		}
		results = append(results, res)
	}

	defer cursor.Close(r.Context())

	json.NewEncoder(w).Encode(results)

}
