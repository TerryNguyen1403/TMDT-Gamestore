#!/bin/sh

until nc -z mongo 27017
do
   echo "Waiting for Mongo..."
   sleep 1
done

echo "Running database seed...."

node seed.js

echo "Starting Express server..."

exec node index.js
