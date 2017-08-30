const express = require('express');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');

const app = express();

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}));

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log('listening...')
});