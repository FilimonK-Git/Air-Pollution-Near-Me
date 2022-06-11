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

      if (data[0]) {
        var timeLapse =moment(data[0].updatedAt, "YYYY-MM-DD HH:mm:ss").fromNow();

        if (timeLapse.includes('hours') || timeLapse.includes('day') || timeLapse.includes('year')) {

          api.airInfoGetter(req.body.zipSearch)
            .then((data)=>{
              // console.log('2nd get saved data in SERVER', data)
              db.secondSave(data)
                .then((data)=>{

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
          res.send(data[0])
        }
      } else {

        api.airInfoGetter(req.body.zipSearch)
          .then((data)=>{

            console.log('data HERE', data instanceof Error)

            if (data instanceof Error) {
              res.send('Data not available!')
            } else {

              db.firstSave(data)
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
                  res.send(newDataToClient)
                })
                .catch((err)=>{
                  console.log('data not saved in db from server', err)
                  res.status(400)
                })
            }
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



app.get('/worst&best', (req, res) => {
  console.log('get home fired')

  // UNCOMMENT OUT WHEN READY TO CALL API FOR WORST CASES

  Promise.all([api.worstAQIgetter()]) // , api.bestAQIgetter()
    .then((data)=>{
      // console.log('worst only', data)
      res.send(data)
      })
    .catch((err)=>{
        console.log('axios worst/best req failed in server', err)
        res.status(400)
    })

})


app.listen(port, ()=>{
  console.log(`Listening on port ${port}`)
})