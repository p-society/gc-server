package models

import (
	"time"

	"github.com/p-society/gCSB/auth/pkg/constants"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Branch    constants.Branch   `json:"branch" bson:"branch"`
	Batch     int                `json:"batch" bson:"batch"`
	Fullname  string             `json:"fullname" bson:"fullname"`
	Email     string             `json:"email" bson:"email"`
	Password  string             `json:"password" bson:"password"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt"`
	UpdatedBy primitive.ObjectID `json:"updatedBy" bson:"updatedBy"`
	Role      constants.Role     `json:"role" bson:"role"`
	Gender    string             `json:"gender" bson:"gender"`
}


// func NewUser(username, email, password string) *User {
// 	return &User{

// 	}
// }

