FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginxinc/nginx-unprivileged:stable
COPY --from=node /app/dist/anoBissexto /usr/share/nginx/html
EXPOSE 8080
