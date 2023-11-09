package helper

import (
	"context"
	"log"

	basketballdb "github.com/p-society/gcbs/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Test() []primitive.M {
	cur, err := basketballdb.Collection.Find(context.Background(), bson.D{})

	if err != nil {
		log.Fatal("Error:", err)
	}

	var Players []primitive.M

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
