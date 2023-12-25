package main

import (
	"fmt"
	"log"
	"net/http"

	route "github.com/p-society/gcbs/routes"
)

func main() {
	fmt.Println("Testing..")
	router := route.Router()

	fmt.Println("api is live at :8080");
	log.Fatal(http.ListenAndServe(":8080", router))
}
