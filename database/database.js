const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/airDB')

console.log('mongo state: ', mongoose.connection.readyState)
/*
ready states being:

0: disconnected
1: connected
2: connecting
3: disconnecting
*/


const airSchema = new mongoose.Schema({
  placeName: String,
  state: String,
  postalCode: String,
  PM25: Number,
  OZONE: Number,
  CO: Number,
  NO2: Number,
  SO2: Number,
  updatedAt: String,
  AQI: Number
})

const air = mongoose.model('air', airSchema)

console.log('mongo state 2nd log: ', mongoose.connection.readyState)
// save func
const firstSave = (data) => {

  return air.create(data)
    .then((data)=>{
      return data
    })
    .catch((err)=>{
      console.log('data not created and added to db', err)
    })

}


const secondSave = (data) => {

  var dataToUpdatedWith = {
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

  return air.findOneAndUpdate({postalCode: data.postalCode}, dataToUpdatedWith, {new: true})
    .then((data)=>{
      return data
    })
    .catch((err)=>{
      console.log('secondSave:  data not updated and added to db', err)
    })

}


// retrieve func
const retrieve = (zipcode) => {
  return air.find({postalCode: zipcode})
    .then((data)=>{
      // console.log('data retrieved from air.find', data)
      return data
    })
    .catch((err)=>{
      console.log('data not  in db', err)
    })
}

module.exports.firstSave = firstSave
module.exports.secondSave = secondSave
module.exports.retrieve = retrieve

