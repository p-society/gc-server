package validate

import (
	"fmt"

	enum "github.com/p-society/gc-server/enums/pkg"
	model "github.com/p-society/gc-server/models/pkg"
)

func ValidateRole(p model.Player) error {

	for _, role := range enum.Roles {
		if role == p.Role {
			return nil
		}
	}

	return fmt.Errorf("invalid role: %s", p.Role)
}
