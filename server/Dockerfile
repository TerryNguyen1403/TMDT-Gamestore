FROM node:22-alpine3.24

WORKDIR /app

COPY . /app/
RUN npm install

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD [ "./entrypoint.sh" ]
