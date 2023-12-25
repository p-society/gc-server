package basketballdb

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// The specific collection instance declared in the global namespace
var Collection *mongo.Collection
var Database *mongo.Database

// Initiator function which runs automatically at the start of application
// This function connects to the DB and returns collection instances which is used for DB actions.
func init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println("Env Loaded Successfully.")
	// Access environment variables
	dbLink := os.Getenv("MONGO_URI")
	const databaseName = "basketball"
	const collection1_Name = "teams"

	clientOptions := options.Client().ApplyURI(dbLink)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	//handling error
	if err != nil {
		log.Fatal("Error Occurred while connecting to the database:", err)
	}

	//if passes through this,connection is successful

	fmt.Println("Connection to Database Successful")

	//assigning collection
	Database = client.Database(databaseName)
	Collection = Database.Collection(collection1_Name)
	fmt.Printf("Collection Instance %s is Ready.", collection1_Name)
}
