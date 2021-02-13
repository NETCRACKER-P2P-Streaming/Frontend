#docker build -f Dockerfile -t streaming_project_frontend:dev .
#docker run -i -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true streaming_project_frontend:dev
docker-compose -f docker-compose.yml up -d --build

