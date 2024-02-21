#!/bin/bash

# Set directory and repository name
directory="$1"
repo_name="$2"

# Validate arguments
if [[ -z "$directory" || -z "$repo_name" ]]; then
  echo "Error: Please provide both directory and repository name."
  exit 1
fi

# Initialize Go module
go mod init "$repo_name"

# Change directory
cd "$directory"

# Create directories
echo "Creating directories..."
mkdir -p bin cmd/main pkg internal

# Create touch files
touch cmd/main/main.go Makefile

echo "Project setup complete!"
