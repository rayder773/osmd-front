FROM node:8-alpine as build
WORKDIR /w
COPY package.json package.json
RUN npm install -q
COPY . .
RUN npm run build

# RUN npm i -g serve && \
#     npm i && \
#     npm run build

FROM nginx:latest
COPY docker/admin/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /w/build/ /usr/share/nginx/html/
