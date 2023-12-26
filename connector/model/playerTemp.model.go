package tempModel


type PlayerTemp struct {
	Name     string                   `json:"name,omitempty" bson:"name,omitempty"`
	Sport    string                   `json:"sport,omitempty" bson:"sport,omitempty"`
	Email    string                   `json:"email,omitempty" bson:"email,omitempty"`
	MetaData []map[string]interface{} `json:"metadata,omitempty" bson:"metadata,omitempty"`
	OTP      int                      `bson:"otp"`
	Verified bool                     `json:"verified" bson:"verified"`
}