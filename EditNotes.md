# 代码修改笔记

生成**node-next**镜像并且下载依赖:
```
make install
```
运行docker:  
```
make up
(完成后 浏览器输入 localhost:8081或者 quseit_web.docker.localhost即可打开next web页面。)
``` 

## 修改详情
  
### **MakeFile:**  
--------
1. 删除命令~~colors echo~~  
    - 理由：无用，且windows命令行不识别
2. docker-compose 指定文件 .docker/docker-compose.yml  
3. make install 修改为打包镜像，镜像名"**quseit_nextjs**"  
4. make up 修改为 运行docker-compose.yml 所有 service

### **/.docker/docker-compose.yml:**  
--------
1. 环境 "${COMPOSE_PROCECT_NAME}" 替换 "**nextjs**"  
2. services.node 更名为 services.**node-next**
3. services.node-next 需要镜像依赖 **quseit_nextjs** 
4. services.node-next 删除 ~~links~~
5. 新增 services.ports = "8081:3000" 

### **/application/package.json:**  
--------
1. name 由"SystemSeed" 修改为 "**system-seed**"  
   - 原命名不规范，不能有大写字母
2. 依赖webpack 版本"^4.16.1" 修改为 "**4.16.1**"  
   - ^4.16.1代码
3. sceipts.start:dev 又 nodemon 修改为 node 

### **/application/Dockfile:**  
--------
1. node镜像 8.9-alpine 替换为 **v12.13.1**
2. **yarn** 代替 npm  
3. EXPOSE 80 => 3000  

### **add .dockerignore:** 
--------
取消跟踪node_modules 跟 package-lock.json


## 反馈：   
--------
Makefile的 shell命令对windows不友好， ubuntu跟macos完美运行

## 总结：  
--------
1. 由于项目使用的node跟npm过旧， npm install的时候会会依赖丢失或者安全提示。 用yarn代替npm即可。  
2. webpack没有指定版本， 把 "^4.16.1" 修改成 "4.16.1"即可修复运行时 webpack属性Undefined. 原理是4.16.1跟之后的版本不一样所导致的bug。
