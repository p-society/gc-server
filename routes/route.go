package route

import (
	"github.com/gorilla/mux"
	controller "github.com/p-society/gcbs/controllers"
)

func Router() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/get-players", controller.GetAllPlayers).Methods("GET")
	return r
}
