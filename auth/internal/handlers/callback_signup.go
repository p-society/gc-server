package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/p-society/gc-server/auth/internal"
	"github.com/p-society/gc-server/auth/internal/db"
	"github.com/p-society/gc-server/auth/pkg/security"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func CallbackVerification(w http.ResponseWriter, r *http.Request) {

	var (
		p       model.Player
		pv      *model.ValidationSchema
		reqBody struct {
			OTP int `json:"otp"`
		}
	)

	json.NewDecoder(r.Body).Decode(&reqBody)
	authHeader := r.Header.Get("Authorization")

	if authHeader == "" && strings.Split(authHeader, " ")[0] != "Bearer" {
		r.Header.Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": "Authorization Token Not found",
		})
		return
	}

	token := strings.Split(authHeader, " ")[1]
	pv = security.ParseAccessToken(token)

	if err := pv.Valid(); err != nil {
		r.Header.Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	if err := internal.CheckOTP(pv.OTP, reqBody.OTP); err != nil {
		r.Header.Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	p = model.Player{
		FirstName: pv.FirstName,
		LastName:  pv.LastName,
		Role:      pv.Role,
		Email:     pv.Email,
		Branch:    pv.Branch,
		Year:      pv.Branch,
		ContactNo: pv.ContactNo,
		Social:    pv.Social,
	}

	res, _ := db.PlayerCollection.InsertOne(context.TODO(), p)

	json.NewEncoder(w).Encode(res.InsertedID)
}
