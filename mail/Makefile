# Define variables
GO_BUILD_FLAGS = -o bin/main

# Define targets

.PHONY: install_deps build run clean

install_deps:
	@echo "Downloading dependencies..."
	@go mod download

build: install_deps
	@echo "Building server..."
	@go build $(GO_BUILD_FLAGS) cmd/main/main.go

run: build
	@echo "Running mail server"
	@./bin/main

clean:
	@echo "Cleaning up...."
	@rm -rf bin/main

# Help target
.PHONY: help

help:
	@echo "Available targets:"
	@grep -E '^.+:' Makefile
