package helper

import (
	"crypto/sha256"
	"encoding/hex"
)

func Secure_Passwords(password string) string {

	// Create a new SHA-256 hasher
	hasher := sha256.New()

	// Write the password bytes to the hasher
	hasher.Write([]byte(password))

	// Get the final hash and convert it to a hexadecimal string
	hashInBytes := hasher.Sum(nil)
	hashString := hex.EncodeToString(hashInBytes)

	// Print the hashed password
	return hashString
}
