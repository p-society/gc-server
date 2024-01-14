package helper

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	verificationModel "github.com/p-society/gCSB/connector/model"
)

func SendMail(message verificationModel.PlayerProfile) string {
	url := "http://localhost:6969/send-mail"

	content := `<html>
	<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5; color: #333; text-align: center; padding: 20px;">

		<img src="https://avatars.githubusercontent.com/u/29895434?s=400&u=59686b8af9d2476daa8886e6616fed4c76588596&v=4" alt="GCSB Logo" style="max-width: 200px; margin-bottom: 20px;">

		<h2 style="color: #007BFF;">Dear ` + message.Name + `,</h2>

		<p style="font-size: 16px;">Greetings from PSoc, IIIT-Bhubaneswar!</p>

		<div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
			<p style="font-size: 18px;">Your One-Time Password (OTP) for GCSB Verification:</p>
			<h3 style="background-color: #007BFF; color: #fff; padding: 10px; border-radius: 5px; font-size: 24px;">` + strconv.Itoa(message.OTP) + `</h3>
			<p style="font-size: 16px;">This OTP is valid for a limited time to ensure the security of your account.</p>
		</div>

		<p style="font-size: 16px; margin-top: 20px;">If you did not request this OTP, please disregard this email.</p>

		<p style="font-size: 16px;">Best regards,<br/>
		The PSoc Team, IIIT-Bhubaneswar</p>

	</body>
</html>`
	// Create a JSON payload
	payload := map[string]interface{}{
		"content": content,
		"subject": "Grand Championship Player OTP Verification",
		"to": []string{
			message.Email,
		},
	}

	// Marshal the payload to JSON
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return err.Error()
	}

	// Create a new request with a POST method and the JSON payload
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return err.Error()
	}

	// Set the Content-Type header to indicate JSON
	req.Header.Set("Content-Type", "application/json")

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making request:", err)
		return err.Error()
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return err.Error()
	}

	// Print the response status and body
	fmt.Println("Response Status:", resp.Status)
	fmt.Println("Response Body:", string(body))
	return string(body)
}
