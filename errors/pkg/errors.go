package errors

import (
	"encoding/json"
	"net/http"
)

func SendErrorJson(w http.ResponseWriter, err error) {
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}
