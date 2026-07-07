## build stage ##
FROM node:22-alpine3.24 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

## serve stage ##
FROM nginx:stable-alpine3.23-perl

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
