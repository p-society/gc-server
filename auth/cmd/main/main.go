package main

import (
	"fmt"

	"github.com/p-society/gc-server/auth/internal/db"
)

func main() {
	fmt.Println("Running...")
	fmt.Print(db.PlayerCollection)
}
