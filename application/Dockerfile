# FROM node:8.9-alpine
FROM node:12.16.1

RUN mkdir -p /app
WORKDIR /app

# RUN npm install -g nodemon
# RUN npm config set registry https://registry.npmjs.org
# COPY package.json /app/package.json
# COPY yarn.lock /app/yarn.lock
COPY . /app
RUN node -v
RUN npm -v
RUN yarn -v
RUN yarn config get registry
RUN yarn config set registry http://registry.npm.taobao.org/
RUN yarn install 

# ENV PORT 8080
EXPOSE 3000

# CMD ["node", "server.js"]
