## build stage ##
FROM node:22-alpine3.24 as build

WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

## serve stage ##
FROM nginx:stable-alpine3.23-perl

WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
