# 基于 Node.js 官方镜像构建
FROM node:18.17.1

# 设置工作目录
WORKDIR /app


# 复制 package.json 和 package-lock.json
COPY pnpm*.yaml ./


# 安装项目依赖
RUN pnpm install

# 复制项目文件到工作目录

COPY . .

# 构建项目
RUN pnpm run build

# 使用 Nginx 镜像
FROM nginx:1.27.0

# 将构建的文件从上一阶段复制到 Nginx 服务器
COPY --from=0 /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
