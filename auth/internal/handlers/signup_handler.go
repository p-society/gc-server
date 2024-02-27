package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/p-society/gc-server/auth/internal/utils"
	"github.com/p-society/gc-server/auth/pkg/security"
	enum "github.com/p-society/gc-server/enums/pkg"
	errors "github.com/p-society/gc-server/errors/pkg"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var p model.Player

	w.Header().Set("Content-Type", "application/json")

	err := json.NewDecoder(r.Body).Decode(&p)
	defer r.Body.Close()
	if err != nil {
		errors.SendErrorJson(w, err)
		return
	}
	// NOTE: To create PSA , Comment this as of now.
	p.Role = enum.PLAYER

	err = p.Valid()
	if err != nil {
		errors.SendErrorJson(w, err)
		return
	}

	// err = utils.IsUniqueInDB(p.Email)
	// if err != nil {
	// 	errors.SendErrorJson(w, err)
	// 	return
	// }

	p.StandardClaims = jwt.StandardClaims{
		IssuedAt:  time.Now().Unix(),
		ExpiresAt: time.Now().Add(5 * time.Minute).Unix(),
	}
	// TODO : Check password to be

	p.OTP = utils.GenerateOTP(6)
	fmt.Println(p.OTP)

	if err := utils.SendEmail(&p); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		errors.SendErrorJson(w, fmt.Errorf("internal server error"))
		return
	}

	hashedPass, err := security.HashPassword(p.Password)

	if err != nil {
		errors.SendErrorJson(w, err)
		panic(err)
	}

	p.Password = string(hashedPass)

	token, err := security.NewAccessToken(p)
	if err != nil {
		errors.SendErrorJson(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"accessToken": token,
		"validity":    "5 minutes",
	})
}
