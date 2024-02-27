package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func SendEmail(p *model.Player) error {
	var (
		url         = "http://localhost:6969/v0/mails"
		requestBody = map[string]interface{}{
			"subject": "Grand Championship Player Verification",
			"content": RenderEngine(p.OTP),
			"to":      []string{p.Email},
		}
	)

	requestBodyBytes, err := json.Marshal(requestBody)
	if err != nil {
		return fmt.Errorf("error encoding JSON: %v", err)
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(requestBodyBytes))
	if err != nil {
		return fmt.Errorf("error sending request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected response status: %s", resp.Status)
	}

	return nil
}
