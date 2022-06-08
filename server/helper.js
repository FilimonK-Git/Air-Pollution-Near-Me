const axios = require('axios')
const key = require('../client/config/config.js')
const db = require('../database/database')
const moment = require('moment')

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

      var dataDate = moment.utc(response.data.stations[0].updatedAt ).toDate();
      var local = moment(dataDate).local().format('YYYY-MM-DD HH:mm:ss');

      response.data.stations[0].updatedAt = local


      return response.data.stations[0]
    })
    .catch((err)=>{
      console.log('err in axios get req from api', err)
    })

}

exports.airInfoGetter = airInfoGetter

