const express = require('express')
const bodyParser = require('body-parser')
const api = require('../server/helper')
const db = require('../database/database')
const moment = require('moment')

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(express.static('client'))


// ONE GET ROUTE REQUIRED


app.post('/airq', (req, res) => {

  db.retrieve(req.body.zipSearch)
    .then((data)=>{

      if (data[0] !== undefined) {

        var timeLapse =moment(data[0].updatedAt, "MM/DD/YYYY HH:mm:ss").fromNow();

        var timeLapseNum
        if(timeLapse.split(' ')[1] === 'hours') {
          timeLapseNum = Number(timeLapse.slice(0,2))
        } else {
          timeLapseNum = 0
        }

        if (timeLapseNum >= 2) {

          api.airInfoGetter(req.body.zipSearch)
            .then((data)=>{
              db.secondSave(data) // saving in addition to new data... not replacing
                .then((data)=>{

                  // console.log('secondSave saved data in SERVER', data)

                  var updatedDataToClient = {
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
                  res.send(updatedDataToClient)
                })
                .catch((err)=>{
                  console.log('data not updated in db from server', err)
                  res.status(400)
                })
          })
          .catch((err)=>{
            console.log('axios req failed in server', err)
            res.status(400)
          })

        } else {
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
          res.send(data[0])
        }
      } else {

        api.airInfoGetter(req.body.zipSearch)
          .then((data)=>{
            db.firstSave(data) // saving in addition to new data... not replacing
              .then((data)=>{

                // console.log('saved data', data)

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
                res.send(newDataToClient)
              })
              .catch((err)=>{
                // console.log('data not saved in db from server', err)
                res.status(400)
              })
          })
          .catch((err)=>{
            console.log('axios req failed in server', err)
            res.status(400)
          })
      }

    })
    .catch((err)=>{
      console.log('data not retrieved and not sent to client', err)
      res.status(400)
    })
})



// app.get('/zz', (req, res) => {
//   console.log('get home fired')
//   api.worstAQIgetter(req.body.zipSearch)
//     .then((data)=>{
//       console.log('get worst', data)
//       res.send(data)
//       })
//      .catch((err)=>{
//         console.log('axios req failed in server', err)
//         res.status(400)
//      })
// })


app.listen(port, ()=>{
  console.log(`Listening on port ${port}`)
})