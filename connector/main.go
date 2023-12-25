package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
	playerRegistation "github.com/p-society/gCSB/connector/controllers"
)

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/register/player",playerRegistation.PlayerRegistrationController)
	
	
	
	
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		err := http.ListenAndServe(":45234", r)

		if err != nil {
			fmt.Println(err);
		}
	}()

	fmt.Println("Connector Live at Port :45234")
	wg.Wait();
}
