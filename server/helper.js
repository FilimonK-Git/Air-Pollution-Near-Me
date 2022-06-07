const axios = require('axios')
const key = require('../client/config/config.js')
const db = require('../database/database')

const airInfoGetter = (zipcode) => {

  const options = {
    method: 'GET',
    url: `https://api.ambeedata.com/latest/by-postal-code?postalCode=${zipcode}&countryCode=US`,
    headers: {
      'x-api-key': key.ambeeKey,
      'Content-type': 'application/json'
    }
  }

  return axios.request(options)
    .then((response)=>{
      console.log('axios get req from api', response.data)
      return response.data.stations[0]
    })
    .catch((err)=>{
      console.log('err in axios get req from api', err)
    })

}

exports.airInfoGetter = airInfoGetter


/*
axios incoming data {
  message: 'success',
  stations: [
    {
      placeId: '6054f46a527c957188b759f819ee209f572bbbf4b170148a9624240f0e5e90f9',
      CO: 0.21,
      NO2: 3.527,
      OZONE: 22.912,
      PM10: 15,
      PM25: 4.43,
      SO2: 1,
      city: 'CA',
      countryCode: 'US',
      division: 'San Mateo',
      lat: 37.7058,
      lng: -122.4619,
      placeName: 'Daly City',
      postalCode: '94016',
      state: 'California',
      updatedAt: '2022-06-06 19:00:00',
      AQI: 21,
      aqiInfo: [Object]
    }
  ]
}

*/