FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.8.2
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
