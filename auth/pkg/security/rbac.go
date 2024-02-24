package security

import (
	"net/http"

	"github.com/p-society/gc-server/auth/internal/utils"
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

	token, err = utils.ExtractTokenFromHeader(r)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	p := ParseAccessToken(token)

	if !contains(rg.AllowedRoles, p.Role) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
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
