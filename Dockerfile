FROM node:alpine as builder
RUN mkdir -p /usr/share/html/
WORKDIR /usr/share/html/
COPY . /usr/share/html/
RUN npm install --production=true

FROM nginx:1.15.2-alpine as nginx
COPY --from=builder /usr/share/html/build/ /usr/share/nginx/html
COPY --from=builder /usr/share/html/nginx.conf /etc/nginx/conf.d/default.conf
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
EXPOSE 80