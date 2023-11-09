package basketballdb

import (
	"context"
	"fmt"
	"log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Collection *mongo.Collection

func init() {


	const connectionString = ""
	const databaseName = "basketball"
	const collection1_Name = "in-match-scoring"

	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal("Error Occurred while connecting to the database:", err)
	}

	fmt.Println("Connection to Database Successful")
	Collection = client.Database(databaseName).Collection(collection1_Name)
	fmt.Printf("Collection Instance %s is Ready.", collection1_Name)
}
