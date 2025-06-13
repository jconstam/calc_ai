# Stop any running container on port 8081
$port = "8081"
$containers = docker ps --format "{{.ID}} {{.Ports}}" | Where-Object { $_ -match $port }
if ($containers) {
    $containers -split "`n" | ForEach-Object {
        $id = ($_ -split " ")[0]
        if ($id) { docker stop $id }
    }
}

# Build the Docker image
docker build -t calculator-dev -f Dockerfile.dev .

# Run the container in the background
docker run -d --rm -p 8081:8081 -v ${PWD}:/app -w /app/src calculator-dev

Write-Host "Development server is running at http://127.0.0.1:8081/"
