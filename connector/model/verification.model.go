package model

import (
	"time"
)

type Callback struct {
	OTP   int    `json:"otp,omitempty" bson:"otp,omitempty"`
	Email string `json:"email,omitempty" bson:"email,omitempty"`
}

type Login struct {
	Email    string `json:"email,omitempty" bson:"email,omitempty"`
	Password string `json:"password,omitempty" bson:"password,omitempty"`
}

type PlayerProfile struct {
	ID            string                 `json:"_id,omitempty" bson:"_id,omitempty"`
	Name          string                 `json:"name,omitempty" bson:"name,omitempty"`
	Team          string                 `json:"team,omitempty" bson:"team,omitempty"`
	Year          string                 `json:"year,omitempty" bson:"year,omitempty"`
	CollegeID     string                 `json:"collegeId,omitempty" bson:"collegeId,omitempty"`
	InstagramID   string                 `json:"instagramId,omitempty" bson:"instagramId,omitempty"`
	Sport         string                 `json:"sport,omitempty" bson:"sport,omitempty"`
	SportMetadata map[string]interface{} `json:"sport-metadata,omitempty" bson:"sport-metadata,omitempty"`
	CreatedAt     time.Time              `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt     time.Time              `json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
	Gender        string                 `json:"gender,omitempty" bson:"gender,omitempty"`
	IsVerified    bool                   `json:"isVerified" bson:"isVerified"`
	Email         string                 `json:"email,omitempty" bson:"email,omitempty" unique:"true"`
	Password      string                 `json:"password,omitempty" bson:"password,omitempty"`
	OTP           int                    `json:"otp,omitempty" bson:"otp,omitempty"`
	OTPExpiration time.Time              `json:"otpexpirationtime,omitempty" bson:"otpexpirationtime,omitempty"`
}

type Admin struct {
	ID    string `json:"_id,omitempty" bson:"_id,omitempty"`
	Name  string `json:"name,omitempty" bson:"name,omitempty"`
	Sport string `json:"sport,omitempty" bson:"sport,omitempty"`
}
