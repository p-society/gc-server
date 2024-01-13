package main

import (
	"fmt"
	"net/http"

	database "github.com/p-society/gCSB/connector/db"
	route "github.com/p-society/gCSB/connector/routes"
)

func main() {
	fmt.Println("starting server...")
	database.Init()
	r := route.Router()
	http.ListenAndServe(":8080", r)
}
