package security

import (
	"fmt"
	"net/http"
	"strings"
)

func ExtractTokenFromHeader(r *http.Request) (string, error) {

	authHeader := r.Header.Get("Authorization")
	if authHeader == "" || len(authHeader) == 2 {
		return "", fmt.Errorf("token not found")
	}

	return strings.Split(authHeader, " ")[1], nil
}
