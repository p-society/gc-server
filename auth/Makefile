# Define variables
GO_BUILD_FLAGS = -o bin/main

# Define targets

.PHONY: install_deps build run clean

install_deps:
	@echo "Downloading dependencies..."
	@go mod download

clean:
	@echo "Cleaning up...."
	@rm -rf bin/main

# Help target
.PHONY: help

help:
	@echo "Available targets:"
	@grep -E '^.+:' Makefile
