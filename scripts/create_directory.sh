#!/bin/bash

# Set directory and repository name
directory="$1"

# Validate arguments
if [[ -z "$directory" ]]; then
  echo "Error: Please provide directory."
  exit 1
fi

# Change directory
cd "$directory"

# Create directories
echo "Creating directories..."
mkdir -p bin cmd/main pkg internal

# Create touch files
touch cmd/main/main.go Makefile

echo "Project setup complete!"
