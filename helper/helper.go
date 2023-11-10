package helper

import (
	"context"
	"fmt"
	"log"

	basketballdb "github.com/p-society/gcbs/database"
	playerModel "github.com/p-society/gcbs/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

//helper function to fetch teamwise players from DB to client.

/*
@Params:
team string --> extracted from URL
*/

func TeamWisePlayers(team string) []primitive.M {

	//creating a cursor instance for query's matching documents
	cur, err := basketballdb.Collection.Find(context.Background(), bson.D{{Key: "team", Value: team}})

	//handling error
	if err != nil {
		log.Fatal("Error:", err)
	}

	// data structure to be sent as response
	var Players []primitive.M

	//metadata associated with the API res and appending it.
	metaData := primitive.M{
		"api_source": "basketball/get-teamwise-player",
	}
	Players = append(Players, metaData)

	//looping through the list of documents using cursor and appending it to the previous Player Data Structure.
	for cur.Next(context.Background()) {

		//temp var to hold the cursor content
		var player bson.M

		err := cur.Decode(&player)
		if err != nil {
			log.Fatal("Error:", err)
		}

		Players = append(Players, player)
	}

	//closing conn.
	defer cur.Close(context.Background())
	return Players
}

func UploadTeamPlayer(player playerModel.Player) *mongo.InsertOneResult {
	inserted, err := basketballdb.Collection.InsertOne(context.TODO(), player)

	if err != nil {
		log.Fatal("Error occured while inserting in db @helper/UploadTeamPlayer")
	}

	fmt.Println("Registration Done :", inserted)

	return inserted
}

func UpdateTeamPlayer(query map[string]string) {

	// updated, err := basketballdb.Collection.UpdateOne(context.TODO(), bson.D{})
}