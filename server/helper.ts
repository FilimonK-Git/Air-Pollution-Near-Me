const axios = require("axios");
const key = require("../client/config/config.js");
const moment = require("moment");

const airInfoGetter =(zipcode: string) =>{
  const airGetOptions = {
    method: "GET",
    url: `https://api.ambeedata.com/latest/by-postal-code?postalCode=${zipcode}&countryCode=US`,
    headers: {
      "x-api-key": key.ambeeKey,
      "Content-type": "application/json",
    },
  };

  return axios
    .request(airGetOptions)
    .then((response) => {
      if (response.data.stations[0]) {
        var dataDate = moment.utc(response.data.stations[0].updatedAt).toDate();
        var local = moment(dataDate).local().format("YYYY-MM-DD HH:mm:ss");
        response.data.stations[0].updatedAt = local;
        return response.data.stations[0];
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      console.error("Error in Axios GET (see airInfoGetter fn())", err);
    });
};

const worstAQIgetter =() =>{
  const worstGetOptions = {
    method: "GET",
    url: "https://api.ambeedata.com/latest/by-order/worst",
    headers: {
      "x-api-key": key.ambeeKey,
      "Content-type": "application/json",
    },
  };

  return axios
    .request(worstGetOptions)
    .then((response) => {
      var worstAQI = 0;
      var worstPlace = undefined;

      for (let i = 0; i < response.data.stations.length; i++) {
        if (response.data.stations[i].AQI > worstAQI) {
          worstAQI = response.data.stations[i].AQI;
          worstPlace = response.data.stations[i];
        }
      }
      return worstPlace;
    })
    .catch((err) => {
      console.error("Error in Axios GET (see worstAQIgetter fn())", err);
    });
};
module.exports = {airInfoGetter, worstAQIgetter}

/*
GRAPHQL

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
*/