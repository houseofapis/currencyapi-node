FROM node:24-slim

USER node
ARG APP_DIR=/home/node/app

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY --chown=node:node package*.json $APP_DIR/

RUN npm i