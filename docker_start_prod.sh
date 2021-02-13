#docker build -f Dockerfile.prod -t streaming_project_frontend:prod .
#docker run -it --rm -p 1337:80 streaming_project_frontend:prod
docker-compose -f docker-compose.prod.yml up -d --build