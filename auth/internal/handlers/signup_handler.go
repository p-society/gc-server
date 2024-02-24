package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/p-society/gc-server/auth/internal"
	"github.com/p-society/gc-server/auth/pkg/security"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var pv model.ValidationSchema

	err := json.NewDecoder(r.Body).Decode(&pv)
	defer r.Body.Close()

	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}
	err = pv.Valid()

	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	fmt.Println("pv.Email @signup", pv.Email)
	err = internal.IsUniqueInDB(pv.Email)
	if err != nil {
		r.Header.Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	// TODO:Send OTP Mail

	pv.StandardClaims = jwt.StandardClaims{
		IssuedAt:  time.Now().Unix(),
		ExpiresAt: time.Now().Add(5 * time.Minute).Unix(),
	}

	pv.OTP = internal.GenerateOTP(6)
	fmt.Println("uhTP : ", pv.OTP)
	token, err := security.NewAccessToken(pv)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"accessToken": token,
		"validity":    "5 minutes",
	})
}
