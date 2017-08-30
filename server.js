const express = require('express');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');
const randomstring = require("randomstring");

const data = [
  {
    oUrl: 'https://google.com/',
    id: randomstring.generate(6)
  }
];

const app = express();

app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true,
    realm: 'Imb4T3st4pp'
}));

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.render('index.ejs', {data});
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const matched = data.find(item => item.id === id);
  if (matched) {
    res.redirect(301, matched.oUrl);
  } else {
    res.status(404);
    res.send('404 Not Found');
  };
})

app.listen(3000, () => {
  console.log('listening...')
});