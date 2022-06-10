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

      var dataDate = moment.utc(response.data.stations[0].updatedAt).toDate();
      var local = moment(dataDate).local().format('YYYY-MM-DD HH:mm:ss');

      response.data.stations[0].updatedAt = local

      return response.data.stations[0]
    })
    .catch((err)=>{
      console.log('err in axios get req from api', err)
    })

}

const worstAQIgetter = () => {

  const options2 = {
    method: 'GET',
    url: 'https://api.ambeedata.com/latest/by-order/worst',
    //    https://api.ambeedata.com/latest/by-order/worst
    headers: {
      'x-api-key': key.ambeeKey,
      'Content-type': 'application/json'
    }
  }

  return axios.request(options2)
  .then((response)=>{

    var worstAQI =0;
    var worstPlace;

    for (let i=0; i< response.data.stations.length; i++) {
      if (response.data.stations[i].AQI > worstAQI) {
        worstAQI = response.data.stations[i].AQI
        worstPlace = response.data.stations[i]
      }
    }

      return worstPlace
    })
    .catch((err)=>{
      console.log('err in axios worst get req from api', err)
    })

}

/*

const bestAQIgetter = () => {

  const options3 = {
    method: 'GET',
    url: 'https://api.ambeedata.com/latest/by-order/best',
    headers: {
      'x-api-key': key.ambeeKey,
      'Content-type': 'application/json'
    }
  }

  return axios.request(options3)
    .then((response)=>{
      // console.log('best place', response)

      var dataDate3 = moment.utc(response.data.stations[0].updatedAt).toDate();
      var local3 = moment(dataDate3).local().format('YYYY-MM-DD HH:mm:ss');
      response.data.stations[0].updatedAt = local3

      // console.log('best place', response.data.stations[0])

      return response.data.stations[0]
    })
    .catch((err)=>{
      console.log('err in axios best get req from api', err)
    })

}
*/
exports.airInfoGetter = airInfoGetter
exports.worstAQIgetter = worstAQIgetter
// exports.bestAQIgetter = bestAQIgetter

