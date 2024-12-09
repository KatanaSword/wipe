FROM node:18

WORKDIR /panel/frontend

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]