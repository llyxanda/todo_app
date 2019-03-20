
# Node Todo App

## Description

Check out the sample project at http://tapwash.com if you haven't already

**We want you to create something similiar that can:** 

* Display Todos
* Add Todos
* Delete Specific Todos
* Is pushed to a git repo so that we can download it

So basically, recreate that app

**Bonus:** 

* Edit Todos
* Change the Todos to users or something else
* Style it to make it look nice

You really don't need to do any of the bonuses,
but if you're feeling confident, knock yourself out

We have the basic skeleton of the app prepared for you in our repo
The task should be fairly straight forward and is expected to take
about 2-6 hours to complete

## Git Info

Installation: 
https://www.atlassian.com/git/tutorials/install-git

We'd recommend you to use the terminal for git it, in order
to get comfy with it, unless of course you already are

## mongoDB and Mongoose Info

Local installation: 
https://docs.mongodb.com/manual/installation/

If you don't want to install mongoDB, we
strongly recommend setting up an account with mlab on: 
https://mlab.com/plans/

It is free and will save you a lot of time
You can then connect directly to the db url from mlab

You just need to create a Sandbox DB, copy the
connection URL and finally create a db user
The url should look something like this: 

mongodb://userX:pass123@ds1010101.mlab.com:101010/your-db-name

## Node JS info

Installation: 
https://nodejs.org/en/

Node uses NPM as a dependency manager
So basically you will always have a package.json file
that decides your dependencies
You can create it by running

```
npm init
```

then proceed

NPM lets you use npm install in order to
add dependencies

Check out the code in the project, and then
install the dependencies for it

```
const express       = require('express')
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose')
```

You can start your node server using commands like
```
npm start
node start
```

Another cool way to do it is using nodemon
It is a dependency that lets you restart node
automatically every time you save a file on it
It makes things a lot easier if you need
to restart the server a lot to test things

Servers like node can usually(probably always) 
read files and variables from the system
You can set the DB whatever way you want
But feel free to use nodes env variables
as we have prepared for you

```
const DB_URL    = process.env.DB_URL
```

You can set the process.env.DB_URL variable
on startup of node by running it together
with the starting command
You can also go even more advanced by having 
your custom start script inside packacke.json
But the first option should be fine

