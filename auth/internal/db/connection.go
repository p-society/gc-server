package db

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	playerDb = "playerdb"
	player   = "players"
)

var PlayerCollection *mongo.Collection

func init() {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error loading .env")
		return
	}

	DB_URI := os.Getenv("DB")

	clientOptions := options.Client().ApplyURI(DB_URI)

	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		panic(err)
	}

	PlayerCollection = client.Database(playerDb).Collection(player)
	fmt.Println("PlayerDB/Player Collection is Ready.")
}
