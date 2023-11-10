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

func TeamWisePlayers(team string) []primitive.M {
	cur, err := basketballdb.Collection.Find(context.Background(), bson.D{{Key: "team", Value: team}})

	if err != nil {
		log.Fatal("Error:", err)
	}

	var Players []primitive.M
	metaData := primitive.M{
		"api_source": "basketball/get-teamwise-player",
	}

	Players = append(Players, metaData)

	for cur.Next(context.Background()) {
		var player bson.M
		err := cur.Decode(&player)
		if err != nil {
			log.Fatal("Error:", err)
		}

		Players = append(Players, player)
	}

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
