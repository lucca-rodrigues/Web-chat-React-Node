#!/bin/bash

echo "Stopping docker containers"
docker stop web-chat-frontend
docker stop web-chat-backend

echo "Removing containers"
docker rm -f web-chat-frontend
docker rm -f web-chat-backend

echo "Removing images"
docker image rm -f web-chat-frontend
docker image rm -f web-chat-backend

echo "Show current images"
docker image ls

echo "Show current containers"
docker ps -a


docker-compose up -d

# Run chmod +x reset.sh and ./reset.sh to execute

