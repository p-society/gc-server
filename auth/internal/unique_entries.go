package internal

import (
	"context"
	"errors"
	"fmt"

	"github.com/p-society/gc-server/auth/internal/db"
	model "github.com/p-society/gc-server/schemas/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func IsUniqueInDB(email string) error {
	fmt.Println("db searching ..", email)
	filter := bson.M{
		"email": email,
	}

	var player model.Player
	err := db.PlayerCollection.FindOne(context.TODO(), filter).Decode(&player)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return err
	}

	fmt.Println("player", player)
	return fmt.Errorf("player already exists")
}
