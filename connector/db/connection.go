package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Database *mongo.Database

func Init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println("Env Loaded Successfully.")

	dbLink := os.Getenv("MONGO_URI")
	const databaseName = "grand-championship"

	clientOptions := options.Client().ApplyURI(dbLink)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal("Error Occurred while connecting to the database:", err)
	}

	fmt.Println("Connection to Database Successful")

	Database = client.Database(databaseName)
}
