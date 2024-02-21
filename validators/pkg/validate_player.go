package validate

import model "github.com/p-society/gc-server/models/pkg"

func ValidatePlayer(p model.Player) error {
	err := ValidateBranch(p)
	if err != nil {
		return err
	}
	err = ValidatePlayer(p)
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
