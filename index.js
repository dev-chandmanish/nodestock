//Stock Market Portfolio
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//api key pk_9287c6ceb5b34acabf56d628863c36f6
//create call_api function
function call_api(finishedAPI, ticker){
	request('https://sandbox.iexapis.com/stable/stock/' + ticker + '/quote?token=Tpk_cf7e7a9919e04795937d26d2ce617c2c', {json: true}, (err, res, body)=> {
		if(err){return console.log(err);}
		if(res.statusCode === 200){
			finishedAPI(body);
		};
	});
};


//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set handlebars index GET routes
app.get('/', function(req, res){
	call_api(function(doneAPI){
		res.render('home', {
			stock: doneAPI
		});
	}, "fb");
	//console.log(api);
});

//set handlebars index POST routes
app.post('/', function(req, res){
	call_api(function(doneAPI){
		res.render('home', {
			stock: doneAPI
		});
	}, req.body.stock_ticker);
});

//create about page route
app.get('/about.html', function(req, res){
	res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port '+ PORT));