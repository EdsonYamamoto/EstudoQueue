var express = require('express');
var router = express.Router();

var amqp = require('amqplib/callback_api');

const url = 'amqp://localhost';
const queue = 'my-queue';

let channel = null;
amqp.connect(url, function (err, conn) {
  if (!conn) {
    throw new Error(`AMQP connection not available on ${url}`);
  }
  conn.createChannel(function (err, ch) {
    channel = ch;
  });
});

process.on('exit', code => {
  channel.close();
  console.log(`Closing`);
});

router.post('/', function (req, res, next) {
  // console.log(res.body);
  // console.log(req.body);
  var teste = "funciona";
  channel.sendToQueue(queue, new Buffer.from(teste));
  //res.render('index', { response: `Successfully sent: ${req.body.message}` });
  res.render('index', { response: `Successfully sent: ${teste}` });
});

module.exports = router;

