import GeneralInfo from "./genInfo.tsx";
import InnerAir from "./aqi.tsx";

const OutterAir = (props) => {
  // console.log('OutterAir props', props)

  if (props.airData.placeName !== "") {
    return (
      <div className="outter">
        <GeneralInfo genInfo={props} />

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
              <td> {Number(props.airData.PM25).toFixed(1)} ug/m3</td>
              <td> 35 ug/m3 (24-hour)</td>
              <td>
                {" "}
                <span class="good"></span>{" "}
                {(35 - props.airData.PM25).toFixed(1)} ug/m3 less
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
              <td> {Number(props.airData.OZONE).toFixed(1)} ppb</td>
              <td> 70 ppb (8-hour) </td>
              <td>
                {" "}
                <span class="semi"></span>{" "}
                {(70 - props.airData.OZONE).toFixed(1)} ppb less
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <a href="https://www.epa.gov/co-pollution" target="_blank">
                  Carbon monoxide
                </a>
              </td>
              <td> {Number(props.airData.CO).toFixed(1)} ppm</td>
              <td> 35 ppm (1-hour) </td>
              <td>
                {" "}
                <span class="good"></span> {(35 - props.airData.CO).toFixed(1)}{" "}
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
              <td> {Number(props.airData.NO2).toFixed(1)} ppb</td>
              <td> 100 ppb (1-hour)</td>
              <td>
                {" "}
                <span class="good"></span>{" "}
                {(100 - props.airData.NO2).toFixed(1)} ppb less
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <a href="https://www.epa.gov/so2-pollution" target="_blank">
                  Sulfur dioxide
                </a>
              </td>
              <td> {Number(props.airData.SO2).toFixed(1)} ppb</td>
              <td> 75 ppb (1-hour) </td>
              <td>
                {" "}
                <span class="good"></span> {(75 - props.airData.SO2).toFixed(1)}{" "}
                ppb less
              </td>
            </tr>
          </tbody>
        </table>

        <InnerAir
          aqi={props.airData.AQI}
          worstAir={props.worstAir}
          worstFinder={props.worstFinder}
        />
      </div>
    );
  }
};

export default OutterAir;
