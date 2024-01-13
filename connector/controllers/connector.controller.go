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
			"message": "Verification Successful",
		})
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	var Logindata verificationModel.Login
	var retrieved_message verificationModel.VerificationModel

	json.NewDecoder(r.Body).Decode(&Logindata)
	VerificationCollection := database.Database.Collection("Verification")
	filter := bson.M{"email": Logindata.Email}
	VerificationCollection.FindOne(r.Context(), filter).Decode(&retrieved_message)

	if retrieved_message.Password == helper.Secure_Passwords(Logindata.Password) {
		w.Write([]byte("<h1>Login Successful</h1>"))
	} else {
		w.Write([]byte("<h1>Login Failed</h1>"))
	}
}

func PlayerRegistration(w http.ResponseWriter, r *http.Request) {

	var playerData verificationModel.PlayerProfile
	json.NewDecoder(r.Body).Decode(&playerData)

	session, err := database.Database.Client().StartSession()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	defer session.EndSession(r.Context())

	err = session.StartTransaction()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	PlayerCollection := database.Database.Collection("Player")
	verificationCollection := database.Database.Collection("verificationdb")

	data, err := PlayerCollection.InsertOne(r.Context(), playerData)
	if err != nil {
		session.AbortTransaction(r.Context())
		fmt.Println(err)
		panic(err)
	}

	playerID := data.InsertedID
	fmt.Println("playerId", playerID, "email", playerData.CollegeID+"@iiit-bh.ac.in")
	_, err = verificationCollection.UpdateOne(
		r.Context(),
		bson.M{"email": playerData.CollegeID + "@iiit-bh.ac.in"},
		bson.M{"$set": bson.M{"playerId": playerID}},
	)

	if err != nil {
		session.AbortTransaction(r.Context())
		fmt.Println(err)
		panic(err)
	}

	err = session.CommitTransaction(r.Context())
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	fmt.Println("Transaction committed successfully")
	json.NewEncoder(w).Encode("DONE")
}
