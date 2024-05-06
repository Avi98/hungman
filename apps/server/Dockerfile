## Stage 0: Base image with only yarn and package.json
FROM docker.io/node:20-alpine@sha256:2f46fd49c767554c089a5eb219115313b72748d8f62f5eccb58ef52bc36db4ad as base

# Add tini to handle signals
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["tini", "--"]

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN pnpm add -g turbo

## Stage 1: step build
FROM base as step

WORKDIR /usr/src/app

COPY . .
RUN turbo prune server --docker

## Stage 2: instal all the dependecies 
FROM step as installer
WORKDIR /usr/src/app

RUN pnpm install --filter=server

## Stage 3: build server application
FROM installer as builder 
WORKDIR /usr/src/app

RUN pnpm turbo build --filter=server
RUN pnpm --filter=server deploy --prod --ignore-scripts ./final-out

## Stage 3: run application
FROM base as runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY  --from=builder /usr/src/app/final-out/dist  dist
COPY  --from=builder /usr/src/app/final-out/node_modules node_modules 
COPY  --from=builder /usr/src/app/final-out/package.json package.json

CMD [ "node", "dist/main.js" ]


