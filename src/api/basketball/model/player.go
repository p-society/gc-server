package playerModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Player data structure (Acting as ORM ) for Basketball Players.

/*
Bson tags are essential for linking struct literals to the corresponding database fields.
They serve as a mapping mechanism between Go structs and the underlying database representation.
They provide a clear association between struct fields and their counterparts in the database. This mapping ensures proper serialization
and deserialization of data when interacting with databases.
*/
type Player struct {
	Name      string             `json:"name,omitempty" bson:"name,omitempty"`
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
