const express   = require('express');
const cors      = require('cors');
const fs        = require('fs');

const app = express();
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.get('/', function (req, res) {
    res.send('Flags API');
})

app.get('/random', function (req, res) {
    const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    
    var rand = Math.floor(Math.random() * jsonData.countries.length);

    const c = jsonData.countries[rand];

    const result = {
		"name" : c.name.common,
		"official" : c.name.official,
		"flag" : c.flags.svg,
		"capital" : c.capital,
		"lingua" :  Object.values(c.languages),
		"continente" : c.continents,
		"moeda" : Object.values(c.currencies).map(m => {return m.name})
    };

    res.json(result);
})

app.get('/country', function (req, res) {
    const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    
    const { name } = req.query;

    const filterNames = name.split(',').map((n) => n.toLowerCase());

    const result = jsonData.countries.filter(
		country => {
			return filterNames.includes(country.name.common.toLowerCase());
		}
    ).map((i) => {
		return {
			"name" : i.name.common,
			"official" : i.name.official,
			"flag" : i.flags.svg
		}
    });

    res.json(result);
});

app.get('/names', function (req, res) {
    const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    
    const result = jsonData.countries.map((i) => {
      	return i.name.common;
    });

    res.json(result.sort());
});

app.listen(3000);