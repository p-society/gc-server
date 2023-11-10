package playerModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Player data structure (Acting as ORM ) for Basketball Players.

type Player struct {
	Name      string             `json:"name,omitempty"`
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ImageLink string             `json:"imageLink,omitempty"`
	Position  string             `json:"pos,omitempty"`
	Branch    string             `json:"branch,omitempty"`
	Year      int                `json:"year,omitempty"`
	Age       int                `json:"age,omitempty"`
	Instagram string             `json:"instagram,omitempty"`
	Minutes   int                `json:"min,omitempty"`
	Rebounds  int                `json:"reb,omitempty"`
	Assists   int                `json:"ast,omitempty"`
	Points    int                `json:"pts,omitempty"`
}
