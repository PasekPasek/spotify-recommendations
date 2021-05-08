ARG BUILD_VERSION=production
ARG PORT=3000

FROM node:15.6-alpine as base
EXPOSE ${PORT}
WORKDIR /usr/src/app
COPY config ./config
COPY package*.json ./

FROM base AS install-dev
WORKDIR /usr/src/app
COPY webpack*.js ./
COPY .babelrc .
COPY public ./public
COPY src ./src
RUN npm install

FROM install-dev AS linter
WORKDIR /usr/src/app
COPY .eslintrc.js .
RUN npm run lint

FROM linter AS test
WORKDIR /usr/src/app
# TO DO

FROM test AS development
ARG BUILD_VERSION
ENV NODE_ENV=${BUILD_VERSION}
WORKDIR /usr/src/app
COPY devServer.js .
CMD ["node", "devServer.js"]

FROM install-dev as builder
WORKDIR /usr/src/app
RUN npm run build

FROM base AS production
ARG BUILD_VERSION
ENV NODE_ENV=${BUILD_VERSION}
WORKDIR /usr/src/app
RUN npm install --production
COPY --from=builder /usr/src/app/dist ./dist
COPY server.js .
CMD ["node", "server.js"]
