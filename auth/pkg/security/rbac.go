package security

import (
	"encoding/json"
	"net/http"
)

type RoleGuard struct {
	AllowedRoles []string
	Handler      http.Handler
}

func (rg *RoleGuard) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var (
		token string
		err   error
	)

	token, err = ExtractTokenFromHeader(r)
	if err != nil || token == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	p := ParseAccessToken(token)

	if !contains(rg.AllowedRoles, p.Role) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": "you are not authorized to access this resource",
		})
		return
	}

	rg.Handler.ServeHTTP(w, r)
}

func contains(roles []string, role string) bool {
	for _, r := range roles {
		if r == role {
			return true
		}
	}
	return false
}
