package security

import (
	"net/http"

	"github.com/p-society/gc-server/auth/internal/utils"
)

// RoleGuard is a middleware for role-based access control
type RoleGuard struct {
	AllowedRoles []string
	Handler      http.Handler
}

// ServeHTTP implements the http.Handler interface for RoleGuard
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

	// Check if user's role is allowed
	if !contains(rg.AllowedRoles, p.Role) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		return
	}

	// Call the next handler in the chain
	rg.Handler.ServeHTTP(w, r)
}

// contains checks if a string is present in a slice of strings
func contains(roles []string, role string) bool {
	for _, r := range roles {
		if r == role {
			return true
		}
	}
	return false
}
