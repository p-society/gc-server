package route

import (
	"github.com/gorilla/mux"
	connector_controller "github.com/p-society/gCSB/connector/controllers"
)

func Router() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/verify", connector_controller.Verify).Methods("POST")
	return r
}
