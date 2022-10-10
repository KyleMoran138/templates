# ++++++++ START PRISMA BUILDER ++++++++
FROM node:16-alpine AS prisma-builder 
WORKDIR /app

COPY ./prisma ./prisma
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci
RUN npx prisma generate
RUN npx prisma migrate deploy
# ++++++++ END PRISMA BUILDER ++++++++


# ++++++++ START FRONTEND BUILDER ++++++++
FROM node:16-alpine AS frontend-builder
WORKDIR /app

COPY ./client/ .
RUN npm ci

# Copy prsima generated files from prisma-builder
COPY --from=prisma-builder /app/node_modules/@prisma/ ./node_modules/@prisma
COPY --from=prisma-builder /app/node_modules/.prisma/ ./node_modules/.prisma

RUN npm run build:docker
# ++++++++ END FRONTEND BUILDER ++++++++


# ++++++++ START BACKEND BUILDER ++++++++
FROM node:16-alpine AS backend-builder
WORKDIR /app

COPY ./package.json ./package-lock.json .

# Install server dependencies
RUN npm ci

# Copy prsima generated files from prisma-builder
COPY --from=prisma-builder /app/node_modules/@prisma/ ./node_modules/@prisma
COPY --from=prisma-builder /app/node_modules/.prisma/ ./node_modules/.prisma
COPY . .

RUN npm run build
# ++++++++ END BACKEND BUILDER ++++++++

# ++++++++ RUN ++++++++
FROM node:16-alpine
WORKDIR /app

# VARS
ENV JWT_SECRET=thisIsABadSecret

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY --from=backend-builder /app/dist ./dist
COPY --from=frontend-builder /app/dist ./dist/client

# Copy prsima generated files from prisma-builder
COPY --from=prisma-builder /app/node_modules/@prisma/ ./node_modules/@prisma
COPY --from=prisma-builder /app/node_modules/.prisma/ ./node_modules/.prisma
COPY --from=prisma-builder /app/prisma/ ./prisma/

EXPOSE 3000

RUN npx prisma migrate deploy

# Run server
CMD ["npm", "run", "start:prod"]