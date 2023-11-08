package basketballdb

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/x/mongo/driver/mongocrypt/options"
)

const connectionString = " "
const databaseName = " "
const collection1_Name = " "

var Collection *mongo.Collection

func init() {

	clientOptions := options.Client().ApplyURI(connectionString)

	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(`Error Occured while connecting to database :`, err)
	}

	fmt.Println("Connection to Database Successful")

	Collection = client.Database(databaseName).Collection(collection1_Name)

	fmt.Printf("Collection Instance %s is Ready.", collection1_Name)
}
