FROM node:18-alpine

WORKDIR /usr/app

COPY . .

RUN npm install && \
    npm run build

EXPOSE 3000

CMD ["npm", "start"]