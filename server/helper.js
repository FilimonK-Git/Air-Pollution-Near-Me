const axios = require("axios");
const key = require("../client/config/config.js");
const db = require("../database/database");
const moment = require("moment");
// const {
//   GraphQLSchema,
//   GraphQLList,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
// } = require("graphql");

// const graph = new GraphQLSchema({
//   query: QueryType,
// });

// const QueryType = new GraphQLObjectType({
//   name: "Query",
//   description: "The root of all...",
//   fields: () => ({
//     placeName: { type: GraphQLString },
//     state: { type: GraphQLString },
//     postalCode: { type: GraphQLString },
//     PM25: { type: GraphQLInt },
//     OZONE: { type: GraphQLInt },
//     CO: { type: GraphQLInt },
//     NO2: { type: GraphQLInt },
//     SO2: { type: GraphQLInt },
//     updatedAt: { type: GraphQLString },
//     AQI: { type: GraphQLInt },
//   }),
// });

const airInfoGetter = (zipcode) => {
  // console.log(" hio");
  const options = {
    method: "GET",
    url: `https://api.ambeedata.com/latest/by-postal-code?postalCode=${zipcode}&countryCode=US`,
    headers: {
      "x-api-key": key.ambeeKey,
      "Content-type": "application/json",
    },
  };

  return axios
    .request(options)
    .then((response) => {
      if (response.data.stations[0]) {
        // console.log("*****", response.data.stations);
        var dataDate = moment.utc(response.data.stations[0].updatedAt).toDate();
        var local = moment(dataDate).local().format("YYYY-MM-DD HH:mm:ss");

        response.data.stations[0].updatedAt = local;
        return response.data.stations[0];
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      console.log("err in axios get req from api", err);
      // return response;
    });
};

const worstAQIgetter = () => {
  const options2 = {
    method: "GET",
    url: "https://api.ambeedata.com/latest/by-order/worst",
    //    https://api.ambeedata.com/latest/by-order/worst
    headers: {
      "x-api-key": key.ambeeKey,
      "Content-type": "application/json",
    },
  };

  return axios
    .request(options2)
    .then((response) => {
      var worstAQI = 0;
      var worstPlace;

      for (let i = 0; i < response.data.stations.length; i++) {
        if (response.data.stations[i].AQI > worstAQI) {
          worstAQI = response.data.stations[i].AQI;
          worstPlace = response.data.stations[i];
        }
      }

      return worstPlace;
    })
    .catch((err) => {
      console.log("err in axios worst get req from api", err);
    });
};

exports.airInfoGetter = airInfoGetter;
exports.worstAQIgetter = worstAQIgetter;
