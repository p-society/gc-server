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

	r.Handle("/v0/players/update", &security.RoleGuard{
		AllowedRoles: []string{enum.ADMIN, enum.PLATFORM_SUPER_ADMIN, enum.ADMIN},
		Handler:      http.HandlerFunc((handlers.UpdateHandler)),
	})

	r.Handle("/v0/players/delete", &security.RoleGuard{
		AllowedRoles: []string{enum.ADMIN, enum.PLATFORM_SUPER_ADMIN, enum.ADMIN},
		Handler:      http.HandlerFunc((handlers.DeleteHandler)),
	})

	return r
}
