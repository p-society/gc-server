package connector_controller

import (
	"encoding/json"
	"net/http"

	database "github.com/p-society/gCSB/connector/db"
	helper "github.com/p-society/gCSB/connector/helpers"
	verificationModel "github.com/p-society/gCSB/connector/model"
)

func Verify(w http.ResponseWriter, r *http.Request) {

	var message verificationModel.VerificationModel
	json.NewDecoder(r.Body).Decode(&message)
	message.OTP, message.OTPExpiration = helper.GenerateOTP()
	message.Password = helper.Secure_Passwords(message.Password)
	message.IsVerified = false

	VerificationCollection := database.Database.Collection("Verification")

	_, err := VerificationCollection.InsertOne(r.Context(), message)

	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}

	_ = helper.SendMail("content","test","b422056@iiit-bh.ac.in")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Please Verify Yourself by submitting the OTP sent in your Email Address",
	})
}
