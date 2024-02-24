package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/p-society/gc-server/auth/internal/db"
	"github.com/p-society/gc-server/auth/pkg/security"
	model "github.com/p-society/gc-server/schemas/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var (
		p       model.Player
		reqBody struct {
			Mail     string `json:"mail"`
			Password string `json:"password"`
		}
	)
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
	}

	filter := bson.M{
		"email": reqBody.Mail,
	}

	err := db.PlayerCollection.FindOne(context.TODO(), filter).Decode(&p)
	if err == mongo.ErrNoDocuments {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(p.Password), []byte(reqBody.Password))
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	p.StandardClaims = jwt.StandardClaims{
		IssuedAt:  time.Now().Unix(),
		ExpiresAt: time.Now().Add(time.Minute * 60 * 24 * 12).Unix(),
	}

	token, err := security.NewAccessToken(p)
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"accessToken": token,
	})
}
