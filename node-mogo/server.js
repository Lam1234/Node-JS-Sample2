var express = require ('express');

var app = express();

var bodyParser = require('body-parser');

var mongoClient = require('mongodb').MongoClient;

var mongodb;

app.use(bodyParser.json());

app.get('/', function(request, response){

	response.send('welcome to ');
});

app.post('/savedetails', function(){

	console.log(request.body);

	if(mongodb != null && mongodb != undefined){

			var resultObject = {};

			mongodb.collection('sample').insertOne(request.body, function(error, result){

				if(error){

					resultObject.status = 'fail';

					resultObject.statusCode = 401;

					resultObject.message = 'create new record failed';

					response.send(JSON.stringify(resultObject));

				}else{

					resultObject.status = 'success';

					resultObject.statusCode = 200;

					resultObject.message = 'create new record success';

					response.send(JSON.stringify(resultObject));

				}

			});

	}
});

app.listen(5244, function(){

		console.log('server running at http://localhost:5244');

		createMongoDbConnection();


});

function createMongoDbConnection(){

	if(mongoClient != null && mongoClient != undefined){

		mongoClient.connect('mongodb://localhost:27017/sample',function(error, dbInstance){

			if(error){

				mongo = null;

				console.log('mongodb connection creation faile');
			}else{

				mongodb = dbInstance;

				console.log('mongodb connection created successfully');
			}

		});
	}

}