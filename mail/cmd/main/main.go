package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/p-society/gc-server/mail/internal"
)

func main() {
	var (
		ADDR string = ":6969"
	)
	r := mux.NewRouter()
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error loading .env")
		return
	}

	r.HandleFunc("/v0/mails", internal.MailRequestHandler).Methods("POST")
	fmt.Println("Server live at http://127.0.0.1" + ADDR)
	http.ListenAndServe(ADDR, r)
}
