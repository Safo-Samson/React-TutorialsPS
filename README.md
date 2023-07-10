# Training-React

## Guide:
1. Fork this repo
2. Update below gitpod link, and change '...' to point to your git repo
3. Click on [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/...) to deploy
4. Follow the guide here: https://handsonreact.com/docs/labs/react-tutorial-typescript
https://handsonreact.com/docs/labs/ts/CreatingNewProject

## Containerisation:
For development
Let's start by adding a Dockerfile
```
FROM node:18-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]
```
Add a .dockerignore, this will help us ignore node_modules, .env etc
```
**/node_modules
**/npm-debug.log
```
build
Let's create a docker-compose.dev.yml. Here we'll also mount our code in a volume so that we can sync our changes with the container while developing.
```
version: "3.8"

services:
  app:
    container_name: app-dev
    image: app-dev
    build:
      context: .
      target: development
    volumes:
      - ./src:/app/src
    ports:
      - 3000:3000
```
Let's start our react app for development!
```
docker-compose -f docker-compose.dev.yml up
```
We can also add it to our package.json
```
"dev": "docker-compose -f docker-compose.dev.yml up"
```
we can use the -d flag to run in daemon mode

Let's check our container!
docker ps
```
REPOSITORY          TAG                   IMAGE ID       CREATED              SIZE
app-dev            latest                5064f3e40c97   About a minute ago    436MB
```
Over 400mb!! Don't worry, this is just for development. We'll optimize our production build with builder pattern!

For production
We'll use nginx to serve our static assets and will help resolve routes when we're using React Router or any kind of routing.

Note: Personally, I do not recommend using static server packages like serve in production, nginx gives us much more performance and control

Let's create a nginx.conf
```
server {
  listen 80;

  location / {
    root /usr/share/nginx/html/;
    include /etc/nginx/mime.types;
    try_files $uri $uri/ /index.html;
  }
}
```
Let's update our Dockerfile for production
```
# Stage 1: Build App

FROM node:18-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
# Copy app files
COPY . .
# Build the app
RUN yarn build

# Stage 2: Bundle static assets with nginx

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```
Let's add a docker-compose.prod.yml file
```
version: "3.8"

services:
  app:
    container_name: app-prod
    image: app-prod
    build:
      context: .
      target: production
```
Build production image
```
docker-compose -f docker-compose.prod.yml build
```
Let's check out our built production image
```
docker images
```
Using builder pattern we reduced out image size to just ~23mb!!
```
REPOSITORY          TAG                   IMAGE ID       CREATED              SIZE
app-prod           latest                c5db8d308bb9   About a minute ago   23.1MB
```
let's start our production container on port 80 with the name react-app
```
docker run -p 80:80 --name react-app app-prod
```
Optimizing static assets (Bonus)
You can also add the following inside the location block to introduce caching for our static assets and javascript bundle.

You can refer this guide to dive deep into optimizing
```
#Cache static assets
location ~* \.(?:jpg|jpeg|gif|png|ico|svg)$ {
  expires 7d;
  add_header Cache-Control "public";
}
#Cache css and js bundle
location ~* \.(?:css|js)$ {
  add_header Cache-Control "no-cache, public, must-revalidate, proxy-revalidate";
}
```



## Install OZSH
```
brew install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
omz update
```
