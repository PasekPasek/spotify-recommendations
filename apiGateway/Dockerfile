ARG BUILD_VERSION=production
ARG PORT=3000

FROM node:15.6-alpine as base
ENV NODE_ENV ${BUILD_VERSION}
EXPOSE ${PORT}
WORKDIR /usr/src/app
COPY config ./config
COPY src ./src
COPY index.js .
COPY package*.json ./

FROM base AS builder
WORKDIR /usr/src/app
RUN npm install

FROM builder AS linter
WORKDIR /usr/src/app
COPY .eslintrc.js .
RUN npm run lint

FROM linter AS test
WORKDIR /usr/src/app
# TO DO

FROM builder AS development
WORKDIR /usr/src/app
CMD ["npm", "run", "start-dev"]

FROM base AS production
WORKDIR /usr/src/app
RUN npm install --production
CMD ["node", "index.js"]
