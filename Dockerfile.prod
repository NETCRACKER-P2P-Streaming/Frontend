# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./.cert/server.crt /etc/nginx/conf.d/server.crt
COPY ./.cert/server.key /etc/nginx/conf.d/server.key
COPY ./.cert/server.pem /etc/nginx/conf.d/server.pem

COPY ./snipetts/snipetts.conf /etc/nginx/conf.d/snipetts.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]