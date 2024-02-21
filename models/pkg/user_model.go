package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Player struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FirstName string             `json:"firstName" bson:"firstName"`
	LastName  string             `json:"lastName" bson:"lastName"`
	MailId    string             `json:"mailId" bson:"mailId"`
	Role      string             `json:"role" bson:"role"`
	Branch    string             `json:"branch" bson:"branch"`
	Year      string             `json:"year" bson:"year"`
	ContactNo string             `json:"contactNo" bson:"contactNo"`
	Social    []string           `json:"socials" bson:"socials"`
}
