FROM node:11.10.0

# Create app directory
WORKDIR /var/www/megasoftcalculator

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
RUN npm install -g pm2
RUN npm install

WORKDIR /var/www/megasoftcalculator/server
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8090
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
