package sendertest

import (
	"fmt"
	"os"
	"testing"

	"github.com/joho/godotenv"
	function "github.com/p-society/gCSB/functions"
)

func TestSendEmailWithGmail(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env")
		return
	}
	senderName := os.Getenv("EMAIL_SENDER_NAME")
	senderAddress := os.Getenv("EMAIL_SENDER_ADDRESS")
	senderPassword := os.Getenv("EMAIL_SENDER_PASSWORD")

	sender := function.NewGmailSender(senderName, senderAddress, senderPassword)
	subject := "A test Email"
	content := `
	<h1>Welcome to GCSB.</h1>
	<code>PS:This is the Programming Society,IIIT-Bh.</code>
	`

	to := []string{"b422056@iiit-bh.ac.in"}
	attachFiles := []string{"../README.md"}

	err = sender.SendEmail(subject, content, to, nil, nil, attachFiles)

}
