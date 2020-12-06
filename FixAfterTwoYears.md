| 错误      | 原因 | 解决方案     |
| :---        |    :----:   |          ---: |
| TypeError: Cannot read property 'tap' of undefined      | webpcak重复引用       | 删除package.json里的webpack，删除package.lock和node_moudule后重新make install   |
| make up后输入app.docker.localhost无响应   | Docker-compose file 里 traefik 没有写镜像版本号，导致一直下latest版本，然后traefik 2.X版本变了        | 指定版本，traefik:v1.7.16-alpine     |
| 无法显示主页，渲染MARKDOWN      | Dockerfile里面写的是80端口，docker-compose里面却写3000，导致traefik找不到     | 注释application/Dockerfile里的ENV PORT 80 和 EXPOSE 80  |