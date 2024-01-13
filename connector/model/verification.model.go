package verificationModel

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type VerificationModel struct {
	ID             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name           string    `json:"name,omitempty" bson:"name,omitempty"`
	Email          string    `json:"email,omitempty" bson:"email,omitempty"`
	Password       string    `json:"password,omitempty" bson:"password,omitempty"`
	OTP            int       `json:"otp,omitempty" bson:"otp,omitempty"`
	OTPExpiration  time.Time `json:"otpexpirationtime,omitempty" bson:"otpexpirationtime,omitempty"`
	IsVerified     bool      `json:"isVerified" bson:"isVerified"`
}
