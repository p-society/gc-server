package main

import (
	"fmt"
	"net/http"

	"github.com/p-society/gc-server/core/internal"
	"github.com/p-society/gc-server/core/internal/db"
)

func main() {
	db.InitCore()
	fmt.Println("core live @ 127.0.0.1:8080")
	http.ListenAndServe(":8080", internal.Router())
}
