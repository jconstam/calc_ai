#!/bin/bash

# Stop any running container on port 8081
port="8081"
containers=$(docker ps --format "{{.ID}} {{.Ports}}" | grep "$port")
if [ ! -z "$containers" ]; then
    echo "$containers" | while read -r line; do
        id=$(echo "$line" | cut -d' ' -f1)
        if [ ! -z "$id" ]; then
            docker stop "$id"
        fi
    done
fi

# Build the Docker image
docker build -t calculator-dev -f Dockerfile.dev .

# Run the container in the background
docker run -d --rm -p 8081:8081 -v "$(pwd):/app" -w /app/src calculator-dev

echo "Development server is running at http://127.0.0.1:8081/"
