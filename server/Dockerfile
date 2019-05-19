FROM node:alpine
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY . /usr/src/app/

# RUN npm ci --only=production
RUN npm install -g pm2
RUN npm install --production=true

EXPOSE 8090

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
