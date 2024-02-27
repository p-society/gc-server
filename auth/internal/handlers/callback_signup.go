package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/p-society/gc-server/auth/internal/db"
	"github.com/p-society/gc-server/auth/internal/utils"
	"github.com/p-society/gc-server/auth/pkg/security"
	errors "github.com/p-society/gc-server/errors/pkg"
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
		errors.SendErrorJson(w, err)
		return
	}

	if err := utils.CheckOTP(p.OTP, reqBody.OTP); err != nil {
		w.Header().Set("Content-Type", "application/json")
		errors.SendErrorJson(w, err)
		return
	}

	res, err := db.PlayerCollection.InsertOne(context.TODO(), model.Player{
		FirstName: p.FirstName,
		LastName:  p.LastName,
		Email:     p.Email,
		Password:  p.Password,
		Role:      p.Role,
		Branch:    p.Branch,
		Year:      p.Year,
		ContactNo: p.ContactNo,
		Social:    p.Social,
		CreatedAt: time.Now(),
	})
	if err != nil {
		// TODO: Handle Error Properly (Duplicacy Mongo..
		// @zakhaev26
		// )
		errors.SendErrorJson(w, err)
		return
	}

	json.NewEncoder(w).Encode(res.InsertedID)
}
