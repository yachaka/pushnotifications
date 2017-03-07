
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.post('/notif', (req, res) => {
  console.log('Received /notif', req.body)
  res.send('Ok!');
});
app.get('/notif', (req, res) => res.send(';)'))
app.listen(8080, (err) => {
  if (err) console.error(err);
  console.log('Runninggg');
})