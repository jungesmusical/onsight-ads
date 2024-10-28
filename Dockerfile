ARG NODE_VERSION=20.18.0-alpine
ARG OUT_DIR=dist

FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:${NODE_VERSION}

ARG OUT_DIR
WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/${OUT_DIR} ./${OUT_DIR}

ENV OUT_DIR=${OUT_DIR}

RUN npm ci --omit dev

CMD node ${OUT_DIR}