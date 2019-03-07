FROM alpine:latest

# Update
RUN apk add --update nodejs
RUN apk add --update npm

# Install app dependencies
COPY ./src/package.json /src/package.json
RUN cd /src ; npm install

# Bundle app source
COPY ./src /src
COPY ./run.sh /run.sh

EXPOSE 3000

CMD ["sh", "run.sh"]
