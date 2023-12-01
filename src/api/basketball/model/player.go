package playerModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//BSON IS IMPORTANT !

// Player data structure (Acting as ORM ) for Basketball Players.
type Player struct {
	Name      string             `json:"name,omitempty"`
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ImageLink string             `json:"imageLink,omitempty" bson:"imageLink,omitempty"`
	Position  string             `json:"pos,omitempty" bson:"pos,omitempty"`
	Branch    string             `json:"branch,omitempty" bson:"branch,omitempty"`
	Year      int                `json:"year,omitempty" bson:"year,omitempty"`
	Age       int                `json:"age,omitempty" bson:"age,omitempty"`
	Instagram string             `json:"instagram,omitempty" bson:"instagram,omitempty"`
	Assists   int                `json:"ast,omitempty" bson:"ast,omitempty"`
	Points    int                `json:"pts,omitempty" bson:"pts,omitempty"`
	CollegeId string             `json:"collegeId,omitempty" bson:"collegeId,omitempty"`
}
