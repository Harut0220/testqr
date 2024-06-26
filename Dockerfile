FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["nodemon", "index.js"]
