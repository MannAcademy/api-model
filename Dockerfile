FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/key.json

CMD ["node", "src/server.js"]