# Releaseboard

*A white board app built on Docker with VueJS, Node (express), Vuetify, MySQL, and Nginx.*

**This repository contains the source code for the application, however it is configured to be run as a multi-container docker
application.**

**Description**

The releaseboard application is a simple CRUD app that uses a RESTful api to create, modify, and track code releases.
The app was built as an online solution to the whiteboard we use in our office.
The next steps of the app will include tracking of git hooks and adding
extra tables for current releases, releases in progress, and releases in test.
**This application is designed as a proof of concept for using Node and VueJS in collaboration.
In it's current form, it is not intended to be used in a commerical or production environment**

**How to install and run:**

In order to run the releaseboard (whiteboard) application, you need to install [docker](https://www.docker.com/).
Docker is a container based platform that allows you to create portable applications. 

After downloading docker create a directory for the app to live, then run the following commands:
```
docker-compose up -d
```
That's it! The application should be up and running on http://localhost:80/

*Windows Users: you can simply download or copy the Dockerfile from this repo, since you don't have curl*

To stop the application at anytime, run:
```
docker-compose stop
```
