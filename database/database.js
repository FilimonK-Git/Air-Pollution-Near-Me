const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/airDB')

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

// save func
const save = (data) => {

  return air.create(data)
    .then((data)=>{
      console.log('data created and added to db:', data )
      return data
    })
    .catch((err)=>{
      console.log('data not created and added to db', err)
    })

}

// retrieve func
const retrieve = (zipcode) => {
  return air.find({postalCode: zipcode})
    .then((data)=>{
      return data
    })
    .catch((err)=>{
      console.log('data not  in db', err)
    })
}

module.exports.save = save
module.exports.retrieve = retrieve

