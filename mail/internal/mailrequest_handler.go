package internal

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/p-society/gc-server/mail/internal/models"
)

func MailRequestHandler(w http.ResponseWriter, r *http.Request) {
	var paramInstance models.MailingParams

	senderName := "Programming Society IIIT-Bh"
	senderAddress := "sampagon738@gmail.com"
	senderPassword := "jppxywoiaflvneue"

	sender := NewGmailSender(senderName, senderAddress, senderPassword)

	err := json.NewDecoder(r.Body).Decode(&paramInstance)

	if err != nil {
		jsonPayload := `{"err": "` + err.Error() + `"}`
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(jsonPayload)
		return
	}

	fmt.Println(paramInstance)

	err = sender.SendEmail(paramInstance.Subject, paramInstance.Content, paramInstance.To, nil, nil, nil)

	if err != nil {
		jsonPayload := `{"err": "` + err.Error() + `"}`
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(jsonPayload)
		return
	}

	fmt.Println("Sucess")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"mail sent successfully",
	})
}
