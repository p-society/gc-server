package main

import (
	"fmt"
	"net/http"

	"github.com/p-society/gc-server/auth/internal/router"
)

func main() {
	fmt.Println("Server Live @ http://127.0.0.1:2609")
	http.ListenAndServe(":2609", router.AuthRouter())
}
