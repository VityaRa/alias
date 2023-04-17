FROM node:18
WORKDIR /app
COPY package*.json /app

RUN npm install
COPY . /app
ENTRYPOINT [ "npm", "run", "start:dev" ]
EXPOSE 3001