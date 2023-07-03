FROM node:16
WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g typescript
RUN npm run build

CMD ["npm", "start"]
