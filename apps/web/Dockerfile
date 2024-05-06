## Stage 0: Base image with only yarn and package.json
FROM docker.io/node:20-alpine@sha256:2f46fd49c767554c089a5eb219115313b72748d8f62f5eccb58ef52bc36db4ad as base

# Add tini to handle signals
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["tini", "--"]

## Stage 1: 
FROM base as builder

WORKDIR /usr/src/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY . .

RUN corepack enable
RUN pnpm add -g turbo

RUN turbo prune web --docker

## Stage 2:
FROM builder as installer

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/out/json/package.json ./package.json
COPY --from=builder /usr/src/app/out/json/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --filter=web

COPY --from=builder /usr/src/app/out/full/ .
RUN turbo run build --filter=web...

## Stage 3:
FROM base as runner 
WORKDIR /usr/src/app

COPY --from=installer /usr/src/app/apps/web/next.config.js .
COPY --from=installer /usr/src/app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer  /usr/src/app/apps/web/.next/standalone ./
COPY --from=installer  /usr/src/app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer  /usr/src/app/apps/web/public ./apps/web/public

CMD ["node", "apps/web/server.js"]