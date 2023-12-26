package playerRegistation

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"strconv"
	"sync"
	"time"

	generaldb "github.com/p-society/gCSB/connector/db"
)

type PlayerTemp struct {
	Name     string                   `json:"name,omitempty" bson:"name,omitempty"`
	Sport    string                   `json:"sport,omitempty" bson:"sport,omitempty"`
	Email    string                   `json:"email,omitempty" bson:"email,omitempty"`
	MetaData []map[string]interface{} `json:"metadata,omitempty" bson:"metadata,omitempty"`
	OTP      int                      `bson:"otp"`
}

func generateOTP() int {
	rand.Seed(time.Now().UnixNano())

	randomNumber := rand.Intn(10000) + 10000

	return randomNumber
}

func PlayerRegistrationController(w http.ResponseWriter, r *http.Request) {
	var player PlayerTemp
	err := json.NewDecoder(r.Body).Decode(&player)
	if err != nil {
		fmt.Println(err)
		return
	}

	OTP := generateOTP()
	player.OTP = OTP
	content := `
	<html>
		<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5; color: #333; text-align: center; padding: 20px;">

			<img src="https://avatars.githubusercontent.com/u/29895434?s=400&u=59686b8af9d2476daa8886e6616fed4c76588596&v=4" alt="GCSB Logo" style="max-width: 200px; margin-bottom: 20px;">

			<h2 style="color: #007BFF;">Dear ` + player.Name + `,</h2>

			<p style="font-size: 16px;">Greetings from PSoc, IIIT-Bhubaneswar!</p>

			<div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
				<p style="font-size: 18px;">Your One-Time Password (OTP) for GCSB Verification:</p>
				<h3 style="background-color: #007BFF; color: #fff; padding: 10px; border-radius: 5px; font-size: 24px;">` + strconv.Itoa(OTP) + `</h3>
				<p style="font-size: 16px;">This OTP is valid for a limited time to ensure the security of your account.</p>
			</div>

			<p style="font-size: 16px; margin-top: 20px;">If you did not request this OTP, please disregard this email.</p>

			<p style="font-size: 16px;">Best regards,<br/>
			The PSoc Team, IIIT-Bhubaneswar</p>

		</body>
	</html>`

subject := "Player Email Verification - GCSB"

	var wg sync.WaitGroup

	ch := make(chan string)
	wg.Add(1)

	go func() {
		defer wg.Done()
		val := sendMail(content, subject, player.Email)
		ch <- val
		close(ch)
	}()

	inserted, err := generaldb.Collection.InsertOne(r.Context(), player)

	fmt.Println("val:", <-ch)
	wg.Wait()

	if err != nil {
		fmt.Println(err)
		return
	}

	err = json.NewEncoder(w).Encode(inserted)

	if err != nil {
		fmt.Println(err)
		return
	}

}

func sendMail(content, subject, to string) string {
	url := "http://localhost:6969/send-mail"

	// Create a JSON payload
	payload := map[string]interface{}{
		"content": content,
		"subject": subject,
		"to": []string{
			to,
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
