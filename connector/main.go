package main

import (
	"fmt"
	"net/http"

	cron "github.com/p-society/gCSB/connector/cron_job"
	database "github.com/p-society/gCSB/connector/db"
	route "github.com/p-society/gCSB/connector/routes"
)

func main() {
	database.Init()
	go cron.CleanupExpiredRecords()
	fmt.Println("starting server...")
	r := route.Router()
	http.ListenAndServe(":8080", r)
	cron.CleanupExpiredRecords()
}
