const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname+"/views/partials")

app.set("View Engine","hbs");
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
   var now = new Date().toString();
   var log = '${now}: ${req.method} ${req.url};'
   console.log(log); 
   fs.appendFile("server.log",log + "\n");   
   next();
});

app.use((req,res,next) => {
   res.render("maintenance.hbs");
});

hbs.registerHelper("getCurrentYear",() => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) => {
	res.render("home.hbs" , {
		pagetitle:"HOME PAGE WITH TEMPLATE",
		WelcomeMessage:"Welcome TO The home.hbs",
		//currentyear:new Date().getFullYear()
	});
});


app.get('/about',(req,res) => {
	res.render('about-template.hbs',{
	    pagetitle : "ABOUT PAGE WITH TEMPLATE",
	    //currentyear : new Date().getFullYear()
	});
});

app.get('/bad',(req,res) => {
	res.send({
		errormessage:"Unable to handle request"	
	});
});

app.listen(3010, () => {
	console.log("Server IS Too up so u can use it!");
});
