const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded())
app.use(express.static('client'))

app.get('/', (req, res) => {
  res.status(200)
})

app.post('/airq', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`)
})