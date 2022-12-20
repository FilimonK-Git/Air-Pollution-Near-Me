import React from 'react'
import {GeneralInfo} from "./genInfo";
import {InnerAir} from "./aqi";


type props = {
  worstFinder: () => void,
  worstAir: {
    placeName: string,
    state: string,
    countryCode: string,
    AQI: string,
    PM25: number
  },
  airData: {
    updatedAt: string,
    placeName: string,
    state: string,
    PM25:number,
    OZONE: number,
    NO2: number,
    SO2: number,
    CO: number,
    AQI: string,
  },

}

export function OuterAir ({worstFinder,airData,worstAir} :props) {

  if (airData.placeName !== "") {
    return (
      <div className="outter">
        <GeneralInfo {...airData} />

        <table>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold" }}> Pollutant</td>
              <td style={{ fontWeight: "bold" }}> Concentration </td>
              <td style={{ fontWeight: "bold" }}>
                <a
                  href="https://www.epa.gov/criteria-air-pollutants/naaqs-table"
                  target="_blank"
                >
                  EPA's Limit (Averaging time)
                </a>
              </td>
              <td style={{ fontWeight: "bold" }}> Compared to EPA's limit </td>
            </tr>

            <tr>
              <td>
                {" "}
                <a href="https://www.epa.gov/pm-pollution" target="_blank">
                  Fine particles
                </a>
              </td>
              <td> {Number(airData.PM25).toFixed(1)} ug/m3</td>
              <td> 35 ug/m3 (24-hour)</td>
              <td>
                {" "}
                <span className="good"></span>{" "}
                {(35 - airData.PM25).toFixed(1)} ug/m3 less
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <a
                  href="https://www.epa.gov/ground-level-ozone-pollution"
                  target="_blank"
                >
                  Ozone
                </a>
              </td>
              <td> {Number(airData.OZONE).toFixed(1)} ppb</td>
              <td> 70 ppb (8-hour) </td>
              <td>
                {" "}
                <span className="semi"></span>{" "}
                {(70 - airData.OZONE).toFixed(1)} ppb less
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <a href="https://www.epa.gov/co-pollution" target="_blank">
                  Carbon monoxide
                </a>
              </td>
              <td> {Number(airData.CO).toFixed(1)} ppm</td>
              <td> 35 ppm (1-hour) </td>
              <td>
                {" "}
                <span className="good"></span> {(35 - airData.CO).toFixed(1)}{" "}
                ppm less
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <a href="https://www.epa.gov/no2-pollution" target="_blank">
                  Nitrogen dioxide
                </a>
              </td>
              <td> {Number(airData.NO2).toFixed(1)} ppb</td>
              <td> 100 ppb (1-hour)</td>
              <td>
                {" "}
                <span className="good"></span>{" "}
                {(100 - airData.NO2).toFixed(1)} ppb less
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <a href="https://www.epa.gov/so2-pollution" target="_blank">
                  Sulfur dioxide
                </a>
              </td>
              <td> {Number(airData.SO2).toFixed(1)} ppb</td>
              <td> 75 ppb (1-hour) </td>
              <td>
                {" "}
                <span className="good"></span> {(75 - airData.SO2).toFixed(1)}{" "}
                ppb less
              </td>
            </tr>
          </tbody>
        </table>

        <InnerAir
          aqi={airData.AQI}
          worstAir={worstAir}
          worstFinder={worstFinder}
        />
      </div>
    );
  } else {
    return (null)
  }
};

// export default OutterAir;
