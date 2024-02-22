package security

import (
	"fmt"

	"github.com/golang-jwt/jwt"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

var _ jwt.Claims = model.Player{}

func Tokenize(p *model.Player) (string, error) {
	signingKey := []byte("saswat,tu23kranklekeiiitkyunaaya")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, p)

	tokenString, err := token.SignedString(signingKey)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func DecodeToken(tokenString string) (model.Player, error) {
	signingKey := []byte("saswat,tu23kranklekeiiitkyunaaya") // Replace with actual secret key

	token, err := jwt.ParseWithClaims(tokenString, &model.Player{}, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})

	if err != nil {
		fmt.Println("err heer")
		return model.Player{}, err
	}

	if claims, ok := token.Claims.(*model.Player); ok && token.Valid {
		fmt.Println("fname = ",&claims.FirstName)
		return *claims, nil
	}

	return model.Player{}, fmt.Errorf("invalid token claims")
}
