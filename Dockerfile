FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

RUN npm run build -- $APP_NAME

EXPOSE 3000

CMD ["node", "dist/apps/${APP_NAME}/main.js"]
