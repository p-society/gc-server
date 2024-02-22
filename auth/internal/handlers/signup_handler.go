package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var p model.Player

	err := json.NewDecoder(r.Body).Decode(&p)
	defer r.Body.Close()

	if err != nil {
		json.NewEncoder(w).Encode(err)
	}
	err = p.Valid()

	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	fmt.Println("player ok")
	json.NewEncoder(w).Encode(p)
}
