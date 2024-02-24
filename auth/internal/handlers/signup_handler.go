package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/p-society/gc-server/auth/internal"
	"github.com/p-society/gc-server/auth/internal/utils"
	"github.com/p-society/gc-server/auth/pkg/security"
	model "github.com/p-society/gc-server/schemas/pkg/models"
	"golang.org/x/crypto/bcrypt"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var p model.Player

	w.Header().Set("Content-Type", "application/json")

	err := json.NewDecoder(r.Body).Decode(&p)
	defer r.Body.Close()
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}

	err = p.Valid()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	err = utils.IsUniqueInDB(p.Email)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	p.StandardClaims = jwt.StandardClaims{
		IssuedAt:  time.Now().Unix(),
		ExpiresAt: time.Now().Add(5 * time.Minute).Unix(),
	}
	// TODO : Check password to be

	p.OTP = utils.GenerateOTP(6)
	fmt.Println(p.OTP)

	if err := internal.SendEmail(&p); err != nil {
		json.NewEncoder(w).Encode(err.Error())
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(p.Password), 10)

	if err != nil {
		panic(err)
	}

	p.Password = string(hashedPass)

	token, err := security.NewAccessToken(p)
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
