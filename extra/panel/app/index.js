const express        = require('express');
const MongoClient    = require('mongodb').MongoClient, f = require('util').format, assert = require('assert');
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

const port = 19988;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
 	if (err) return console.log(err);
    assert.equal(null, err);
    if (database == null) {
        return console.log("database is null");
    }
	database = database.db("pulsate");
	require('./app/routes')(app, database);

	app.listen(port, () => {
		console.log('We are live on ' + port);
	});               
})