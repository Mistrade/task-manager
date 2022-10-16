FROM node:16.16.0

WORKDIR /app

COPY package.json /app
# COPY package*.json ./

RUN npm install -g npm

RUN npm install

# RUN apt update && apt upgrade 
# RUN apt install xsel -y

COPY . .

RUN npm run build

RUN npm install --global serve