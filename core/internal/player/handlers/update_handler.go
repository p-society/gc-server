package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/p-society/gc-server/auth/pkg/security"
	"github.com/p-society/gc-server/core/internal/db"
	errors "github.com/p-society/gc-server/errors/pkg"
	model "github.com/p-society/gc-server/schemas/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func UpdateHandler(w http.ResponseWriter, r *http.Request) {
	var (
		p map[string]interface{}
	)
	token, _ := security.ExtractTokenFromHeader(r)
	reqP := security.ParseAccessToken(token)
	id := reqP.ID
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		errors.SendErrorJson(w, err)
		return
	}

	filter := bson.M{"_id": id}

	//  Prepare update operation
	update := bson.M{
		"$set": p,
	}

	if p["email"] != nil {
		w.WriteHeader(http.StatusBadRequest)
		errors.SendErrorJson(w, fmt.Errorf("email can't be changed"))
		return
	}

	var x model.Player
	res := db.PlayerCollection.FindOneAndUpdate(context.Background(), filter, update)
	if res.Err() != nil {
		errors.SendErrorJson(w, res.Err())
		return
	}

	// Decode the result into x
	if err := res.Decode(&x); err != nil {
		errors.SendErrorJson(w, err)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"updated": true,
	})
}
