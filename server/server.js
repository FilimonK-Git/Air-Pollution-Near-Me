const express = require('express')
const bodyParser = require('body-parser')
const api = require('../server/helper')
const db = require('../database/database')
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(express.static('client'))


let latestDateTime = new Date();
let date = ("0" + latestDateTime.getUTCDate()).slice(-2);
let month = ("0" + (latestDateTime.getUTCMonth() + 1)).slice(-2);
let year = latestDateTime.getUTCFullYear();
let hours = ("0" + latestDateTime.getUTCHours()).slice(-2);
let minutes = latestDateTime.getUTCMinutes();
const currentDateTimeUTC = year + month + date + hours + minutes + '00';
// console.log('curr date', currentDateTimeUTC)

// ONE GET ROUTE REQUIRED

app.post('/airq', (req, res) => {

  db.retrieve(req.body.zipSearch)
    .then((data)=>{

      console.log('ret data', data)

      let latestDataDate;
      let timeDiff;

      if (data[0] !== undefined) {
        latestDataDate = data[0].updatedAt.replace(/\D/g,'')
        // console.log('curr ', currentDateTimeUTC)
        // console.log('latest ', latestDataDate)
        timeDiff = Number(currentDateTimeUTC) - Number(latestDataDate)
      }

      if (data[0] === undefined || timeDiff >= 20000) {

        api.airInfoGetter(req.body.zipSearch)
          .then((data)=>{
            db.save(data)
              .then((data)=>{

                var newDataToClient = {
                  placeName: data.placeName,
                  state: data.state,
                  postalCode: data.postalCode,
                  PM25: data.PM25,
                  OZONE: data.OZONE,
                  CO: data.CO,
                  NO2: data.NO2,
                  SO2: data.SO2,
                  updatedAt: data.updatedAt,
                  AQI: data.AQI
                }
                console.log('new data sending to c', newDataToClient)

                res.send(newDataToClient)
              })
              .catch((err)=>{
                console.log('data not saved in db from server', err)
                res.status(400)
              })
          })
          .catch((err)=>{
            console.log('axios req failed in server', err)
            res.status(400)
          })


      } else if (data[0]) {

        var existingDataToClient = {
          placeName: data[0].placeName,
          state: data[0].state,
          postalCode: data[0].postalCode,
          PM25: data[0].PM25,
          OZONE: data[0].OZONE,
          CO: data[0].CO,
          NO2: data[0].NO2,
          SO2: data[0].SO2,
          updatedAt: data[0].updatedAt,
          AQI: data[0].AQI
        }

        console.log('existing data before sending to client', existingDataToClient)

        res.send(existingDataToClient)
      }
    })
    .catch((err)=>{
      console.log('data not retrieved and not sent to client', err)
      res.status(400)
    })
})



// app.get('/', (req, res) => {

// })


app.listen(port, ()=>{
  console.log(`Listening on port ${port}`)
})