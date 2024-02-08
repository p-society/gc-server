build-and-run:
	make install_deps
	make build
	make run 

install_deps:
	go mod download

build:
	go build -o bin/main cmd/main/main.go

run:
	go run ./cmd/main