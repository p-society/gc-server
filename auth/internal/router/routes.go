package router

import (
	"github.com/gorilla/mux"
	"github.com/p-society/gc-server/auth/internal/handlers"
)

func AuthRouter() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/v0/auth/signup", handlers.SignUpHandler).Methods("post")
	r.HandleFunc("/v0/auth/callback/signup", handlers.CallbackVerification).Methods("post")
	r.HandleFunc("/v0/auth/login", handlers.Login).Methods("POST")
	return r
}
