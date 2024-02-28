package db

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	playerDb = "playerdb"
	player   = "players"
)

var (
	PlayerCollection *mongo.Collection
	Gcsb             *mongo.Database
)

func InitAuth() {
	// err := godotenv.Load()

	// if err != nil {
	// 	fmt.Println("Error loading .env")
	// 	return
	// }

	// DB_URI := os.Getenv("DB")

	clientOptions := options.Client().ApplyURI(`mongodb+srv://soubhik:soubhik@sports.vj9j4tb.mongodb.net/?retryWrites=true&w=majority&appName=Sports`)

	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		panic(err)
	}

	Gcsb = client.Database(playerDb)
	PlayerCollection = Gcsb.Collection(player)

	if _, err = PlayerCollection.Indexes().CreateOne(
		context.Background(),
		mongo.IndexModel{
			Keys:    bson.D{{Key: "email", Value: 1}},
			Options: options.Index().SetUnique(true),
		},
	); err != nil {
		fmt.Println("Failed to Create index ", err.Error())
		return
	}

	fmt.Println("PlayerDB/Player Collection is Ready.")
}
