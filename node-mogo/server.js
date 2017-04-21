var express = require ('express');

var app = express();

var bodyParser = require('body-parser');

var mongoClient = require('mongodb').MongoClient;

var mongodb;

//Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());


app.get('/', function(request, response){

	response.send('Welcome to Lam Website!');

});


app.post('/savedetails', function(request, response){

	console.log(request.body);

	if(mongodb != null && mongodb != undefined){

		var resultObj = {};

		mongodb.collection('lam').insertOne(request.body, function(error, result){

			if(error){

				resultObj.status = 'Fail';

				resultObj.statusCode = 401;

				resultObj.message = 'Create new record failed';

				response.send(JSON.stringify(resultObj));

			}else{

				resultObj.status = 'Success';

				resultObj.statusCode = 200;

				resultObj.message = 'Create new record success';

				response.send(JSON.stringify(resultObj));

			}

		});
	}
});


app.listen(5244, function(){

	console.log('server running at http://localhost:5244');

	createMongoDbConnection();

});


//set up mongodb connection
function createMongoDbConnection(){

	if(mongoClient != null && mongoClient != undefined){

		mongoClient.connect('mongodb://localhost:27017/lam',function(error, dbObj){

			if(error){

				mongodb = null;

				console.log('Create mongodb connection failed');

			}else{

				mongodb = dbObj;

				console.log('Create mongodb connection success');
			}

		});
	}

}