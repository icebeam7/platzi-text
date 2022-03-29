"use strict";

const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app

const bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const textAnalytics = require("./js/text_analytics.js")
const luis = require("./js/luis.js")

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
  });

app.get('/step1', (req, res) => {
  res.sendFile(__dirname + '/static/step1.html');
});

app.post('/step1', (req, res) => {
  let message = req.body.message;

  textAnalytics.langDetect(message)
    .then((language) => {
      textAnalytics.sentAnalysis(message)
      .then((sentiment) => {
        res.render(__dirname + "/static/step2.html", 
        { 
          message: message, 
          language: language, 
          sentiment: sentiment 
        });
      })
    });
});

app.get('/step2', (req, res) => {
  res.sendFile(__dirname + '/static/step2.html');
});


app.get('/luis1', (req, res) => {
  res.sendFile(__dirname + '/static/luis1.html');
});

app.post('/luis1', (req, res) => {
  let message = req.body.message;

  luis.analyzeText(message)
    .then((luisResult) => {
      res.render(__dirname + "/static/luis2.html", 
      { 
        luisResult: luisResult
      });
    });
});

app.get('/luis2', (req, res) => {
  res.sendFile(__dirname + '/static/luis2.html');
});

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));