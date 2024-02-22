package model

import (
	"fmt"

	enum "github.com/p-society/gc-server/enums/pkg"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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

func ValidateRole(p *Player) error {

	for _, role := range enum.Roles {
		if role == p.Role {
			return nil
		}
	}

	return fmt.Errorf("invalid role: %s", p.Role)
}

func ValidateBranch(p *Player) error {

	for _, branch := range enum.Branches {
		if branch == p.Branch {
			return nil
		}
	}

	return fmt.Errorf("invalid Branch: %s", p.Branch)
}

func ValidateYear(p *Player) error {

	for _, year := range enum.Years {
		if year == p.Year {
			return nil
		}
	}

	return fmt.Errorf("invalid Year: %s", p.Year)
}

func ValidatePlayer(p Player) error {
	err := ValidateBranch(&p)
	if err != nil {
		return err
	}
	err = ValidateRole(&p)
	if err != nil {
		return err
	}
	err = ValidateYear(&p)
	if err != nil {
		return err
	}

	return nil
}

func (p Player) Valid() error {
	return ValidatePlayer(p)
}
