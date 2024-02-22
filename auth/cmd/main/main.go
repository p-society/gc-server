package main

import (
	"fmt"
	"net/http"

	"github.com/p-society/gc-server/auth/internal/router"
	"github.com/p-society/gc-server/auth/pkg/security"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func main() {
	fmt.Println("Running...")
	p := model.Player{
		FirstName: "Soubhik",
	}
	dat, err := security.Tokenize(&p)
	fmt.Println(err)
	px, _ := security.DecodeToken(dat)
	fmt.Println(dat, "\n\nAfter decoding = ",px)
	http.ListenAndServe(":2609", router.AuthRouter())
}
