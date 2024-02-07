package models

type MailingParams struct {
	Subject     string   `json:"subject,omitempty"`
	Content     string   `json:"content,omitempty"`
	To          []string `json:"to,omitempty"`
	AttachFiles []string `json:"attachFiles,omitempty"`
}