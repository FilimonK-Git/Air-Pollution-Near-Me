import * as React from 'react'
import * as moment from "moment";
moment().format();

type props = {
  updatedAt: string,
  placeName: string,
  state: string,

}

export function GeneralInfo ({updatedAt, placeName, state} :props) {
  const dataCaptureDateTime = updatedAt;
  const dataDateTime = new Date(dataCaptureDateTime);
  const localTime = moment().format("h:mm:ss A");
  const dataDateTimeSTR = dataDateTime.toLocaleString();
  const timeDiff = moment(dataDateTimeSTR, "MM/DD/YYYY HH:mm:ss a").fromNow();

  if (placeName !== "") {
    return (
      <div className="locDataTime">
        <p>
          Here's your latest air pollution data for{" "}
          <b>
            {placeName}, {state}
          </b>
          .
        </p>
        <p>
          Latest available data was collected on{" "}
          <em>{dataDateTime.toLocaleString()}</em>, about {timeDiff} from your
          local time <em>{localTime}. </em>
        </p>

        <p>
          Data powered by:
          <a href="https://www.getambee.com/" target="_blank">
            Ambee DataAir
          </a>
        </p>
        <br></br>
      </div>
    );
  } else {
    return (null)
  }
};

// export default GeneralInfo;
