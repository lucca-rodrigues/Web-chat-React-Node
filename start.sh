#!/bin/bash

echo "Stopping docker containers"
docker stop web-chat-frontend
docker stop web-chat-backend
docker stop web-chat-frontend-1
docker stop web-chat-backend-1
docker stop alpine

echo "Removing containers"
docker rm -f web-chat-frontend
docker rm -f web-chat-backend
docker rm -f web-chat-frontend-1
docker rm -f web-chat-backend-1
docker rm -f alpine

echo "Removing images"
docker image rm -f web-chat-frontend
docker image rm -f web-chat-backend
docker image rm -f web-chat-frontend-1
docker image rm -f web-chat-backend-1
docker image rm -f alpine

echo "Show current images"
docker image ls

echo "Show current containers"
docker ps -a

# Run chmod +x reset.sh and ./reset.sh to execute

