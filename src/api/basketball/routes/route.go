package route

import (
	"github.com/gorilla/mux"
	controller "github.com/p-society/gcbs/controllers"
)

func Router() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/get-teamwise-players", controller.GetTeamWisePlayers).Methods("GET")
	r.HandleFunc("/upload-player", controller.UploadTeamPlayer).Methods("POST")
	r.HandleFunc("/update-player", controller.UpdateTeamPlayer).Methods("POST")
	return r
}
