#Define Node.js image to use
FROM nginx:latest
# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app
# Install app dependencies
COPY ./index.html /usr/src/app
COPY ./dist/* /usr/src/app/dist/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Install prerequisites
#Expose port 80
EXPOSE 80