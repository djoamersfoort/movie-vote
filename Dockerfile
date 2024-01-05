FROM node:20
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY index.js index.js
COPY html html

EXPOSE 8080

CMD [ "npm", "start" ]
