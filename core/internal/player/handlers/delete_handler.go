package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/p-society/gc-server/auth/pkg/security"
	"github.com/p-society/gc-server/core/internal/db"
	errors "github.com/p-society/gc-server/errors/pkg"
	model "github.com/p-society/gc-server/schemas/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func DeleteHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	token, err := security.ExtractTokenFromHeader(r)
	if err != nil {
		errors.SendErrorJson(w, err)
	}

	p := security.ParseAccessToken(token)

	p.IsDeleted = true
	p.DeletedBy = p.ID

	update := bson.M{
		"$set": bson.M{
			"isDeleted": true,
			"deletedBy": p.ID, //for now ...
			"deletedAt": time.Now(),
		},
	}

	filter := bson.M{"_id": p.ID}

	var x model.Player
	res := db.PlayerCollection.FindOneAndUpdate(context.Background(), filter, update)

	if err := res.Decode(&x); err != nil {
		errors.SendErrorJson(w, err)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"updated": true,
	})

}
