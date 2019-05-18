FROM node:8

# Create app directory
WORKDIR /var/www/megasoftcalculator

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
RUN npm install -g pm2

# Bundle app source
COPY . .

EXPOSE 8090
CMD [ "pm2", "start", "server/app.js" ]
