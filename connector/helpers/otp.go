package helper

import (
	"math/rand"
	"time"
)

const otpValidityMinutes = 5

func GenerateOTP() (int, time.Time) {
	rand.Seed(time.Now().UnixNano())

	OTP := rand.Intn(10000) + 10000
	expirationTime := time.Now().Add(otpValidityMinutes * time.Minute)

	return OTP, expirationTime
}
