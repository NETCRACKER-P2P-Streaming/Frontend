#npm install
#npm run build
#npm start


#docker build -t sample:dev .
#docker run -i -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true sample:dev

docker-compose up -d --build