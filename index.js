const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
//require('dotenv').config();
const app = express()
const port = 5000

index = 5;
let users = [
  {
    "id": 1,
    "accountname": "Mike",
    "password": "123456"
  },
  {
    "id": 2,
    "accountname": "Tyler",
    "password": "123456"
  },
  {
    "id": 3,
    "accountname": "Wesley",
    "password": "123456"
  },
  {
    "id": 4,
    "accountname": "Amy",
    "password": "123456"
  },
  {
    "id": 5,
    "accountname": "Matt",
    "password": "123456"
  },
]

app.use(express.static('public'))

app.use(bodyParser.json())

app.use(cors())


app.get('/', (req, res) => {
    console.log('Get at Localhost')
    res.send('Hello World!')
})

// POST method route
app.post('/', function (req, res) {
  const body = req.body
  console.log(body)
  res.send(body)
})

  app.get('/users', (req, res) => {
    res.send(users);
})

// POST method route
app.post('/users', function (req, res) {
  const body = req.body;
  body.id = ++index;
  users.push(body);
  res.send( { msg: 'Got a POST request at /user' } )
})

app.put('/users', function (req, res) {
  const body = req.body
  const index = users.findIndex((ele) => ele.accountname === body.accountname)
  users[index].password = body.password
  res.send('Got a PUT request at /user')
})

app.get('/login', (req, res) => {
  console.log('login get')
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  const body = req.body
  const found = users.find((ele) => ele.accountname === body.accountname && ele.password === body.password)
  if(found != null){
    console.log("LOGIN")
    res.status(200).send(true);
  }
  else{
    console.log("INCORRECT LOGIN")
    res.status(400).send(false);
  }
})
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
