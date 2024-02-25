package main

import (
	"fmt"
	"net/http"

	"github.com/p-society/gc-server/auth/internal/router"
)

func main() {
	fmt.Println("Running...")
	http.ListenAndServe(":2609", router.AuthRouter())
}
