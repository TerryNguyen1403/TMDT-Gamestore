FROM node:22-alpine3.24

WORKDIR /app

COPY . /app/
RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]
