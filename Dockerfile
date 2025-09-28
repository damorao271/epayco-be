FROM node:20-alpine
WORKDIR /app

# Install Yarn v4
RUN corepack enable && corepack prepare yarn@4.0.0 --activate

COPY package.json yarn.lock ./
RUN yarn install --immutable

COPY . .

ARG APP_NAME=EPAYCO
ENV APP_NAME=${APP_NAME}

RUN yarn build $APP_NAME

EXPOSE 3000

CMD ["node", "dist/apps/${APP_NAME}/main.js"]