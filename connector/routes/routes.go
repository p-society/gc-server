package route

import (
	"github.com/gorilla/mux"
	connector_controller "github.com/p-society/gCSB/connector/controllers"
)

func Router() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/verify", connector_controller.Verify).Methods("POST")
	r.HandleFunc("/callback/verify", connector_controller.CallbackVerification).Methods("POST")
	r.HandleFunc("/login", connector_controller.Login).Methods("POST")
	r.HandleFunc("/player/registration", connector_controller.PlayerRegistration).Methods("POST")
	return r
}
