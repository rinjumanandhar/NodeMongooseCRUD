var express = require("express"),
    route = require("./route/route"),
    promiseRoute = require("./route/routePromise"),
    asyncRoute = require("./route/asyncRoute"),
    parser= require("body-parser"),
    app = express();


const mongoose = require('mongoose');
let db_url = 'mongodb://rinju:nepal4321@ds024748.mlab.com:24748/mydb';
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(parser.json());
app.use('/api/', route);
app.use('/promise/', promiseRoute);
app.use('/async', asyncRoute);

app.listen(8000, () => {
    console.log('Server is up and running');
});