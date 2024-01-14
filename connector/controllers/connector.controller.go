package connector_controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	database "github.com/p-society/gCSB/connector/db"
	helper "github.com/p-society/gCSB/connector/helpers"
	verificationModel "github.com/p-society/gCSB/connector/model"
	"go.mongodb.org/mongo-driver/bson"
)

func Verify(w http.ResponseWriter, r *http.Request) {
	var message verificationModel.PlayerProfile
	json.NewDecoder(r.Body).Decode(&message)
	message.OTP, message.OTPExpiration = helper.GenerateOTP()
	message.Password = helper.Secure_Passwords(message.Password)
	message.IsVerified = false

	PlayerCollection := database.Database.Collection("Player")
	_, err := PlayerCollection.InsertOne(r.Context(), message)

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
	var retrieved_message verificationModel.PlayerProfile
	_ = json.NewDecoder(r.Body).Decode(&callback_message)
	PlayerCollection := database.Database.Collection("Player")
	filter := bson.M{"email": callback_message.Email}
	PlayerCollection.FindOne(r.Context(), filter).Decode(&retrieved_message)

	if retrieved_message.OTP == callback_message.OTP {
		fmt.Println("OK")
		filter := bson.M{"email": callback_message.Email}
		update := bson.M{"$set": bson.M{"isVerified": true,
			"createdAt": time.Now(),
		}}
		PlayerCollection.FindOneAndUpdate(r.Context(), filter, update)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Verification Successful",
		})
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	var Logindata verificationModel.Login
	var retrieved_message verificationModel.PlayerProfile

	json.NewDecoder(r.Body).Decode(&Logindata)
	PlayerCollection := database.Database.Collection("Player")
	filter := bson.M{"email": Logindata.Email}
	PlayerCollection.FindOne(r.Context(), filter).Decode(&retrieved_message)

	if retrieved_message.Password == helper.Secure_Passwords(Logindata.Password) {
		json.NewEncoder(w).Encode(retrieved_message)
	} else {
		json.NewDecoder(r.Body).Decode(map[string]interface{}{
			"Error": "Password doesn't match",
		})
	}
}

func PlayerRegistration(w http.ResponseWriter, r *http.Request) {

	var playerData verificationModel.PlayerProfile
	json.NewDecoder(r.Body).Decode(&playerData)

	PlayerCollection := database.Database.Collection("Player")
	update := bson.M{
		"$set": bson.M{
			"name":           playerData.Name,
			"team":           playerData.Team,
			"collegeId":      playerData.CollegeID,
			"gender":         playerData.Gender,
			"instagramId":    playerData.InstagramID,
			"sport-metadata": playerData.SportMetadata,
			"year":           playerData.Year,
			"sport":          playerData.Sport,
			"updatedAt":      time.Now(),
		}}

	filter := bson.M{
		"email": playerData.Email,
	}
	data, err := PlayerCollection.UpdateOne(r.Context(), filter, update)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	fmt.Println(data)

	json.NewEncoder(w).Encode("DONE")
}
