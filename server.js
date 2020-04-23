// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//template pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
  var q = req.query.q;
  if(!q) {
    res.render('todos/index', {
      todos: todos
    })
  }
  var matchList = todos.filter((todo) => {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('todos/index', {
    todos: matchList,
    contentSearch: q
  });
});

app.post('/todos/create', (req, res) => {
  todos.push(req.body);
  console.log(todos);
  res.redirect('/todos');
});


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
