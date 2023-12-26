# Using the Mailing API Docker Container

This Docker container provides a mailing API service for the GCSB project. Before running the container, make sure you have Docker installed on your system.

## Step 1: Build the Docker Image

Build the Docker image, providing values for the required environment variables (EMAIL_SENDER_NAME, EMAIL_SENDER_ADDRESS, and EMAIL_SENDER_PASSWORD).

```bash

docker build --build-arg EMAIL_SENDER_NAME=<mailingName> \
             --build-arg EMAIL_SENDER_ADDRESS=<mailingAddress@example.com> \
             --build-arg EMAIL_SENDER_PASSWORD=<YourEmailPassword> \
             -t mailing-api-image .
```

## Step 3: Run the Docker Container

Run the Docker container, mapping the host port to the container port, and providing the same environment variables.

```bash

docker run -p 6969:6969 \
           -e EMAIL_SENDER_NAME=<mailingName> \
           -e EMAIL_SENDER_ADDRESS=<mailingAddress@example.com> \
           -e EMAIL_SENDER_PASSWORD=<YourEmailPassword> \
           mailing-api-image
```

The API should now be accessible at http://localhost:6969/send-mail.


## Bash Script:

To simplify the process, you can create a bash script. 

### Copy this bash script:

```bash
#!/bin/bash

# Set your environment variables
export EMAIL_SENDER_NAME="YourSenderName"
export EMAIL_SENDER_ADDRESS="your_email@example.com"
export EMAIL_SENDER_PASSWORD="YourEmailPassword"

# Build the Docker image
docker build --build-arg EMAIL_SENDER_NAME="$EMAIL_SENDER_NAME" \
             --build-arg EMAIL_SENDER_ADDRESS="$EMAIL_SENDER_ADDRESS" \
             --build-arg EMAIL_SENDER_PASSWORD="$EMAIL_SENDER_PASSWORD" \
             -t mailing-api-image .

# Run the Docker container
docker run -p 6969:6969 \
           -e EMAIL_SENDER_NAME=<mailingName> \
           -e EMAIL_SENDER_ADDRESS=<mailingAddress@example.com> \
           -e EMAIL_SENDER_PASSWORD=<YourEmailPassword> \
           mailing-api-image

```

### Make the script executable:

```bash
chmod +x run-mailing-api.sh
```

### Run the script:

```bash
./run-mailing-api.sh
```


This script encapsulates the build and run steps, making it easy to execute the entire process with a single command.