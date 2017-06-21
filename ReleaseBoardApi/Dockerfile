#Define Node.js image to use
FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
#Expose port 3000
EXPOSE 3000
#Start the application
CMD [ "npm", "run", "prod" ]