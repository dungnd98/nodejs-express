// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [] })
  .write()

//template pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  var todoList = db.get('todos').value();
  var q = req.query.q;
  if(!q) {
    res.render('todos/index', {
      todos: todoList
    });
    return;
  }
  var matchList = todoList.filter((todo) => {
    return todo.content.toLowerCase().indexOf(q) !== -1;
  });
  res.render('todos/index', {
    todos: matchList,
    contentSearch: q
  });
});

app.post('/todos/create', (req, res) => {
  db.get('todos').push({
    id: db.get('todos').value().length+1,
    content: req.body.newItem
  }).write();
  res.redirect('/todos');
});

app.get('/todos/:id/delete', (req, res) => {
  var id = parseInt(req.params.id);
  var deleteTodo = db.get('todos').remove({ id: id}).write();
  res.redirect('/todos');
})



// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
