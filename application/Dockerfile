# FROM node:8.9-alpine
FROM node:12.13.1

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN node -v
RUN yarn -v
RUN yarn config get registry
RUN yarn config set registry http://registry.npm.taobao.org/
RUN yarn install 

EXPOSE 3000

CMD ["node", "server.js"]
