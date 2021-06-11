FROM node:8.9-alpine

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g nodemon
RUN npm config set registry https://registry.npmjs.org
COPY package.json /app/package.json
# RUN npm install 
# compose 已经挂载了application文件夹，感觉不需要这个
# COPY . /app   

# 应用端点由compose定义，这里应该都不需要了
# ENV PORT 80   
# EXPOSE 80

# CMD ["node", "server.js"]
