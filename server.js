// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

//template pug
app.set('view engine', 'pug');
app.set('views', './views');

var todos = [
    {name: 'Đi chợ'},
    {name: 'Nấu cơm'},
    {name: 'Rửa bát'},
    {name: 'Học code tại CodersX'}
  ]

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  res.render('todos/index', {
    todos: todos
  });
});


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
