package security

import (
	"github.com/golang-jwt/jwt"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func NewAccessToken(claims model.ValidationSchema) (string, error) {
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return accessToken.SignedString([]byte("saswat,tu23kranklekeiiitkyunaaya"))
}

func ParseAccessToken(accessToken string) *model.ValidationSchema {
	parsedAccessToken, _ := jwt.ParseWithClaims(accessToken, &model.ValidationSchema{}, func(token *jwt.Token) (interface{}, error) {
		return []byte([]byte("saswat,tu23kranklekeiiitkyunaaya")), nil
	})
	return parsedAccessToken.Claims.(*model.ValidationSchema)
}
