package playerRegistation

import "net/http"

type PlayerTemp struct {
	Name     string
	Sport    string
	MetaData []map[string]interface{}
}

func PlayerRegistrationController(w http.ResponseWriter, r *http.Request) {

}
