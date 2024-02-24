package internal

import (
	"fmt"
	"math/rand"
)

func GenerateOTP(len int) int {
	prng := rand.Float64()
	prng *= 100000
	return int(prng)
}

func CheckOTP(actualOTP int, sentOTP int) error {

	if actualOTP == sentOTP {
		return nil
	}

	return fmt.Errorf("OTP Invalid")
}
