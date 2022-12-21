const express = require("express");
const bodyParser = require("body-parser");
const api = require("../server/helper");
const db = require("../database/database");
const moment2 = require("moment");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("client"));

app.post("/airq", (req, res) => {
  db.retrieve(req.body.zipSearch)
    .then((data) => {
      if (data[0]) {
        var timeLapse = moment2(
          data[0].updatedAt,
          "YYYY-MM-DD HH:mm:ss"
        ).fromNow();

        if (
          timeLapse.includes("years") ||
          timeLapse.includes("year") ||
          timeLapse.includes("months") ||
          timeLapse.includes("month") ||
          timeLapse.includes("hours") ||
          timeLapse.includes("day") ||
          timeLapse.includes("year")
        ) {
          api.airInfoGetter(req.body.zipSearch)
            .then((data) => {
              db.secondSave(data)
                .then((data) => {
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
                    AQI: data.AQI,
                  };
                  res.send(updatedDataToClient);
                })
                .catch(() => {
                  res.status(400);
                });
            })
            .catch(() => {
              res.status(400);
            });
        } else {
          res.send(data[0]);
        }
      } else {
        api.airInfoGetter(req.body.zipSearch)
          .then((data) => {
            if (data instanceof Error) {
              res.send("Data not available!");
            } else {
              db.firstSave(data)
                .then((data) => {
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
                    AQI: data.AQI,
                  };
                  res.send(newDataToClient);
                })
                .catch(() => {
                  res.status(400);
                });
            }
          })
          .catch(() => {
            res.status(400);
          });
      }
    })
    .catch(() => {
      res.status(400);
    });
});

app.get("/worst&best", (req, res) => {

  Promise.all([api.worstAQIgetter()])
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(400);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
