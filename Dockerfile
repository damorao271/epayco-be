FROM node:20-alpine
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.0.0 --activate

COPY package.json yarn.lock .yarn .pnp.* ./
RUN yarn install --immutable

COPY . .

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

RUN yarn build $APP_NAME

EXPOSE 3000

CMD ["node", "dist/apps/${APP_NAME}/main.js"]