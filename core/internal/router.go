package internal

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/p-society/gc-server/auth/pkg/security"
	"github.com/p-society/gc-server/core/internal/player/handlers"
	enum "github.com/p-society/gc-server/enums/pkg"
)

func Router() *mux.Router {
	r := mux.NewRouter()

	r.Handle("/v0/players", &security.RoleGuard{
		AllowedRoles: []string{enum.ADMIN, enum.PLAYER, enum.PLATFORM_SUPER_ADMIN},
		Handler:      http.HandlerFunc((handlers.UpdateHandler)),
	}).Methods("PATCH")

	r.Handle("/v0/players", &security.RoleGuard{
		AllowedRoles: []string{enum.ADMIN, enum.PLATFORM_SUPER_ADMIN, enum.PLAYER},
		Handler:      http.HandlerFunc((handlers.DeleteHandler)),
	}).Methods("DELETE")

	r.Handle("/v0/players", &security.RoleGuard{
		AllowedRoles: []string{enum.ADMIN, enum.PLATFORM_SUPER_ADMIN},
		Handler:      http.HandlerFunc((handlers.GetHandler)),
	}).Methods("GET")
	return r
}
