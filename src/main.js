const express   = require('express');
const fs        = require('fs');

const app = express();

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
    "pt-br" : c.translations.por.common,
    "flag" : c.flags.svg,
    "capital" : c.capital,
    "lingua" : c.languages,
    "continente" : c.continents
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