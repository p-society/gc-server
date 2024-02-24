package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/p-society/gc-server/auth/internal/db"
	"github.com/p-society/gc-server/auth/internal/utils"
	"github.com/p-society/gc-server/auth/pkg/security"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func CallbackVerification(w http.ResponseWriter, r *http.Request) {

	var (
		p       *model.Player
		reqBody struct {
			OTP int `json:"otp"`
		}
	)

	json.NewDecoder(r.Body).Decode(&reqBody)
	authHeader := r.Header.Get("Authorization")

	if authHeader == "" && strings.Split(authHeader, " ")[0] != "Bearer" {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": "Authorization Token Not found",
		})
		return
	}

	token := strings.Split(authHeader, " ")[1]
	p = security.ParseAccessToken(token)

	if err := p.Valid(); err != nil {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	if err := utils.CheckOTP(p.OTP, reqBody.OTP); err != nil {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	res, _ := db.PlayerCollection.InsertOne(context.TODO(), p)

	json.NewEncoder(w).Encode(res.InsertedID)
}
