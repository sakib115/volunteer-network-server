const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
require("dotenv").config()

const uri = `mongodb+srv://sakibsheikh:${process.env.DB_PASS}@cluster0.6d4vl.mongodb.net/volunteer?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log(client)
})
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})
client.connect(err => {
    const collection = client.db("volunteer").collection("registrations");
    app.get('/request/:pname', (req, res) => {
    collection.find({ name: req.params.pname})
      .toArray((err, data) => {
        res.send(data)
      })
    })
    app.post('/addRegistration', (req, res) => {
    const info = req.body;
    collection.insertOne(info)
    .then(result => {
      res.send('data added successfully')
    })
    })
    app.delete('/delete/:id', (req, res) => {
    collection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send('data deleted successfully')
    })
    })
});

app.listen(process.env.PORT || 4500, () => {
  console.log('port 4500 activated')
})