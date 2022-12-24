FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm wzorcowka.js
EXPOSE 3000
CMD [ "node", "index.js" ]