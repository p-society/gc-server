package cron

import (
	"context"
	"fmt"
	"time"

	database "github.com/p-society/gCSB/connector/db"
	"go.mongodb.org/mongo-driver/bson"
)

func CleanupExpiredRecords() {

	for {
		fmt.Println("Running Cron")
		VerificationCollection := database.Database.Collection("Verification")
		threshold := time.Now().Add(-5 * time.Minute)

		_, err := VerificationCollection.DeleteMany(
			context.TODO(),
			bson.M{
				"otpexpirationtime": bson.M{"$lt": threshold},
				"isVerified":        false,
			},
		)

		if err != nil {
			fmt.Println("Error deleting expired records:", err)
		}

		time.Sleep(time.Minute*10);
	}

}
