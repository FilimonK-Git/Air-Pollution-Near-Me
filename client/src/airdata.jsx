import GeneralInfo from './genInfo.jsx'
import InnerAir from './aqi.jsx'

const OutterAir = (props) => {
  console.log('OutterAir props', props)

  // if (props.airData.placeName !== '') {

    return (
      <div>
        <GeneralInfo genInfo={props}/>

        <table>
          <tbody>

            <tr>
              <td> Pollutant </td>
              <td> Concentration </td>
              <td><a href="https://www.epa.gov/criteria-air-pollutants/naaqs-table" target="_blank">Limit (Averaging time)</a></td>
            </tr>

            <tr>
              <td> <a href="https://www.epa.gov/pm-pollution" target="_blank">Fine particles</a></td>
              <td> {Number(props.airData.PM25).toFixed(1)} ug/m3</td>
              <td> 35 ug/m3 (24-hour)</td>
            </tr>

            <tr>
              <td> <a href="https://www.epa.gov/ground-level-ozone-pollution" target="_blank">Ozone</a></td>
              <td> {Number(props.airData.OZONE).toFixed(1)} ppb</td>
              <td> 70 ppb (8-hour) </td>
            </tr>

            <tr>
              <td> <a href="https://www.epa.gov/co-pollution" target="_blank">Carbon monoxide</a></td>
              <td> {Number(props.airData.CO).toFixed(1)} ppm</td>
              <td> 35 ppm (1-hour) </td>
            </tr>

            <tr>
              <td> <a href="https://www.epa.gov/no2-pollution" target="_blank">Nitrogen dioxide</a></td>
              <td> {Number(props.airData.NO2).toFixed(1)} ppb</td>
              <td> 100 ppb (1-hour)</td>
            </tr>

            <tr>
              <td> <a href="https://www.epa.gov/so2-pollution" target="_blank">Sulfur dioxide</a></td>
              <td> {Number(props.airData.SO2).toFixed(1)} ppb</td>
              <td> 75 ppb (1-hour) </td>
            </tr>


          </tbody>
        </table>

        {/* <p>Your current Air Quality Index (AQI) is <b style={{'color': 'green'}}>{props.airData.AQI}</b>,
          compared to the city,state with the worst nationwide AQI(), and relative to the city,state with the best nationwide AQI() </p> */}

        <InnerAir aqi={props.airData.AQI}/>

      </div>
    )
  // }
}




export default OutterAir









