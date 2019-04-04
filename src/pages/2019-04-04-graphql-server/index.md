---
path: "/graphql-server"
date: "2019-04-04T20:00:00"
title: "Graphql server with MongoDB and Koa"
tags: ["javascript", "backend", "graphql"]
---

One of the things I've enjoyed most about using Gatsby is learning to use [Graphql](https://graphql.org/). I've just started creating an app which needs to save calendar events to a database so I thought it would be cool to see if I could create a Graphql server instead of using [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoints like I normally would. It turns out that creating a Graphql server capable of basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) is a lot easier than I was expecting, here's how I did it.

## The packages
I'm writing this in JavaScript because it's the only language I really *know*, I have dabbled with others but unless you use the language day in and day out, it's difficult to make it stick. Besides which, JavaScript is capable of doing so much that I haven't found a good enough reason other than curiosity to move to another language yet. 

Ordinarily I write Node servers with Express, this time I thought it would be fun to try [Koa](https://koajs.com/). Koa is made by the creators of Express and uses ansync functions instead of callbacks, it's also pretty lightweight and  doesn't come with any middleware so you can add only the stuff that you need (we'll be using koa-mount which sets up the routes and koa-graphql which lets us use Graphql). If you want to use Express instead then the below code will work just as well, you'll just need to use the Express Graphql middleware instead. 

I'm using [Mongoose](https://mongoosejs.com/) for the database which allows you to create models for your data which are persisted in [MongoDB](https://www.mongodb.com/).

## Getting started
The first thing you need to do is set up an empty project with `npm init`, then install the packages mentioned above as well as the main Graphql package which is a collection of constructor functions which we use for creating our schemas and types:
```
npm install koa koa-mount koa-graphql graphql mongoose
```
You are also going to need to have MongoDB installed and running. You can either install this on your computer directly or do like I did and run it in a Docker container. I'm not going to go into how to do that here though, if you can't work it out then let me know and I'll lend a hand.

## Server.js
The first file to write is the entrypoint, I've called it _server.js_, but you can call it whatever you like! Here's the file in full:
```javascript{numberLines: true}
const koa = require('koa');
const graphqlHTTP = require('koa-graphql');
const mount = require('koa-mount');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/calendar`, {
  useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected.'));

const app = new koa();
app.listen(9000);

app.on('error', err => {
  console.log('Server error', err);
});

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
);
```
At the top of the file we require in all of the packages we're going to use. On _Line 7_ we call `mongoose.connect` which opens a connection to our MongoDB (make sure it's running!) and connects to a database called `calendar`. If the named database doesn't exist then Mongoose will create one for you automatically. Passing the option `{ useNewUrlParser: true }` prevents you from receiving a "DeprecationWarning" message in your console.

Next, we listen for mongoose to let us know whether the connection was successful or not. I just log the message out to stdout in either case.

On _line 15_ we create a new Koa app and tell it to listen on port 9000, followed by some error handling which just logs the error message to stdout again.

Finally on _line 22_ we add the middleware. We use `koa-mount` to create the route `/graphql`, any requests to this URL are passed to the koa-graphql middleware. Our Graphql middleware takes our schema, which we will write next, and we're also telling it to use `graphiql`. [Graphiql](https://github.com/graphql/graphiql) is a great tool which lets you run queries against your server whilst you are developing it and also when you are developing the frontend which uses it. Graphiql also creates documentation for you automatically, showing anyone who is using your API which endpoints are available and what each one is capable of.
