package validators

import model "github.com/p-society/gc-server/schemas/pkg/models"

func ValidatePlayer(p *model.Player) error {
	err := ValidateBranch(p)
	if err != nil {
		return err
	}
	err = ValidateRole(p)
	if err != nil {
		return err
	}
	err = ValidateYear(p)
	if err != nil {
		return err
	}

	return nil
}
