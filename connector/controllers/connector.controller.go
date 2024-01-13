package connector_controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	database "github.com/p-society/gCSB/connector/db"
	helper "github.com/p-society/gCSB/connector/helpers"
	verificationModel "github.com/p-society/gCSB/connector/model"
	"go.mongodb.org/mongo-driver/bson"
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

	_ = helper.SendMail(message)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Please Verify Yourself by submitting the OTP sent in your Email Address",
	})
}

func CallbackVerification(w http.ResponseWriter, r *http.Request) {

	var callback_message verificationModel.Callback
	var retrieved_message verificationModel.VerificationModel
	_ = json.NewDecoder(r.Body).Decode(&callback_message)
	VerificationCollection := database.Database.Collection("Verification")
	filter := bson.M{"email": callback_message.Email}
	VerificationCollection.FindOne(r.Context(), filter).Decode(&retrieved_message)

	if retrieved_message.OTP == callback_message.OTP {
		fmt.Println("OK")
		filter := bson.M{"email": callback_message.Email}
		update := bson.M{"$set": bson.M{"isVerified": true}}
		VerificationCollection.FindOneAndUpdate(r.Context(), filter, update)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Verification Successful",
		})
	}
}
