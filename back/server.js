var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs         = require('fs');

var Web        = require('./web.js');
var Scraper    = require('./scraper.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/japscan/list', function(req, res) {
    Web.getHTML("http://www.japscan.com/mangas/one-piece/", function(HTMLcontent) {
        fs.readFile("./Template/JapscanOneManga.html", 'utf8', function (err,FileContent) {
            Scraper.exec(HTMLcontent, FileContent, function(result) {
                res.json({ message: result });                
            });
        });
    });
    Web.getHTML("http://www.japscan.com/mangas/07-ghost/", function(HTMLcontent) {
        fs.readFile("./Template/JapscanOneManga.html", 'utf8', function (err,FileContent) {
            Scraper.exec(HTMLcontent, FileContent, function(result) {
                res.json({ message: result });                
            });
        });
    });

});


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

