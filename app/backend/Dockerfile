FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3001

# RUN npm run prestart

ENTRYPOINT [ "npm", "run" ]

CMD ["start"]

