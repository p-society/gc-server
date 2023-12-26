package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
	playerRegistation "github.com/p-society/gCSB/connector/controllers"
	generaldb "github.com/p-society/gCSB/connector/db"
)

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/register/player", playerRegistation.PlayerRegistrationController)
	r.HandleFunc("/verify/player",playerRegistation.VerifyPlayerController)
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		generaldb.Init()
		err := http.ListenAndServe(":45234", r)

		if err != nil {
			fmt.Println(err)
		}
	}()

	fmt.Println("Connector Live at Port :45234")
	wg.Wait()
}
