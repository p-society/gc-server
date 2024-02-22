package validators

import (
	"fmt"

	enum "github.com/p-society/gc-server/enums/pkg"
	model "github.com/p-society/gc-server/schemas/pkg/models"
)

func ValidateYear(p *model.Player) error {

	for _, year := range enum.Years {
		if year == p.Year {
			return nil
		}
	}

	return fmt.Errorf("invalid Year: %s", p.Year)
}
