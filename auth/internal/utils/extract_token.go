package utils

import (
	"fmt"
	"net/http"
	"strings"
)

func ExtractTokenFromHeader(r *http.Request) (string, error) {

	authHeader := r.Header.Get("Authorization")
	if authHeader == "" && strings.Split(authHeader, " ")[0] == "Bearer" {
		return "", fmt.Errorf("token not found")
	}

	return strings.Split(authHeader, " ")[1], nil
}
