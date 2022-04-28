'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/',  (req, res) => {
  res.send(
      "<h1>How to use this API</h1>"+
      "Use <b>/total</b> to get Total Supply of SOY.<br/>"+
      "Use <b>/circulating</b> to get Circulating Supply of SOY.<br/>"+
      "Use <b>/burned</b> to get Bruned Amount of SOY."
  )
});

router.get('/circulating',  (req, res) => {
  contract.methods.totalSupply().call((error, totalSupply) => {
      contract.methods.balanceOf("0xdEad000000000000000000000000000000000000").call((error, deadWalletBalance) => {
          contract.methods.balanceOf("0x67c20e815D9016CfE04e905A409D276BF1f52b67").call((error, treasuryBalance) => {
              contract.methods.balanceOf("0xEbBDd505bA4E6CaD0C17ccd5cbd88CBA073Fe934").call((error, idoBalance) => {
                  res.send(((parseInt(totalSupply) - parseInt(deadWalletBalance) - parseInt(treasuryBalance) - parseInt(idoBalance))/10**18).toString())
              })
          })
      })

    })
});

router.get('/total',  (req, res) => {
  contract.methods.totalSupply().call((error, totalSupply) => {
      res.send((parseInt(totalSupply)/10**18).toString())
  })
});

router.get('/burned',  (req, res) => {
  contract.methods.totalSupply().call((error, totalSupply) => {
      contract.methods.balanceOf("0xdEad000000000000000000000000000000000000").call((error, deadWalletBalance) => {
          res.send((parseInt(deadWalletBalance)/10**18).toString())
      })

    })
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
