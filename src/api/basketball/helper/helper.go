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
func TeamWisePlayers(branch string) []primitive.M {

	//creating a cursor instance for query's matching documents
	cur, err := basketballdb.Collection.Find(context.Background(), bson.D{{Key: "branch", Value: branch}})

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
	fmt.Println("Recv UTP ::",player);
	inserted, err := basketballdb.Collection.InsertOne(context.TODO(), player)

	if err != nil {
		log.Fatal("Error occured while inserting in db @helper/UploadTeamPlayer",err)
	}

	fmt.Println("Registration Done :", inserted)

	return inserted
}

func GetPlayerByName(name string) (playerModel.Player, error) {
	var player playerModel.Player

	// Construct the filter
	filter := bson.D{{Key: "name", Value: name}}

	// Find the player in the database
	result := basketballdb.Collection.FindOne(context.Background(), filter)
	if result.Err() != nil {
		if result.Err() == mongo.ErrNoDocuments {
			fmt.Println("Player not found")
			return player, fmt.Errorf("Player not found")
		}
		log.Println("Error finding player:", result.Err())
		return player, result.Err()
	}
	// Decode the player data
	err := result.Decode(&player)
	if err != nil {
		log.Println("Error decoding player:", err)
		return player, err
	}

	return player, nil
}


	type requestBody struct {
		Name           string `json:"name"`
		IncrementPoint int    `json:"incrementPoint"`
		IncrementAssist int    `json:"incrementAssist"`
	}


	func IncrementPlayerStats(player playerModel.Player, IncrementStats requestBody ) (playerModel.Player) {
		fmt.Println("b4 pts::",player.Points);
		fmt.Println("b4 ast::",player.Assists);
		player.Points+=IncrementStats.IncrementPoint;
		player.Assists+=IncrementStats.IncrementAssist;
		fmt.Println("IncrementePLayerStats pts::",player.Points);
		fmt.Println("IncrementePLayerStats ast::",player.Assists);
		return player
	}

	func UpdateTeamPlayer(player playerModel.Player) (*mongo.UpdateResult) {
		fmt.Println("recv pts::",player.Points);
		fmt.Println("recv ast::",player.Assists);
		update := bson.D{{"$set", bson.D{{"pts", player.Points},{"ast", player.Assists}}}}
		updateRes,err :=basketballdb.Collection.UpdateByID(context.TODO(),player.ID,update)
		if err != nil {
			fmt.Println(err);
		}
		fmt.Println(updateRes);
		return updateRes;
	}