#!/bin/bash
./repair-mongo.sh
sudo docker rm mongo-instance
sudo docker run --name mongo-instance -d -v /data/mongodb/db:/data/db -p 27017:27017 mangoraft/mongodb-arm

