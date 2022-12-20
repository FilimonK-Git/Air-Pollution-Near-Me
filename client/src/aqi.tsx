import React, {FC} from 'react'
import { AirComparer } from './comparer'

type props = {
  worstFinder: () => void,
  aqi: string,
  worstAir: {
    placeName: string,
    state: string,
    countryCode: string,
    AQI: number,
    PM25: number
  }
}


const InnerAir = ({worstFinder,aqi,worstAir} :props) => {

  if (aqi !== "") {
    var currAQI = Number(aqi)

    if (currAQI >= 0 && currAQI <= 50) {
      return (
        <div className="currentAQI">
          <p>Your current Air Quality Index (AQI) is: <b className="aqi1" style={{'color': 'green', 'backgroundColor': 'white', 'fontSize': '25px'}}> {currAQI} </b><button onClick={worstFinder}>Compare?</button><br></br>
          </p>
          <AirComparer {...worstAir}/>
        </div>
      )
    } else if (currAQI >= 51 && currAQI <= 100) {
      return (
        <div className="currentAQI">
          <p>Your current Air Quality Index (AQI) is <b className="aqi2" style={{'color': 'rgb(208, 208, 11)', 'fontSize': '25px'}}>{currAQI}</b>  <button onClick={worstFinder}>Compare?</button><br></br>
          </p>
          <AirComparer {...worstAir}/>
        </div>
      )
    } else if (currAQI >= 101 && currAQI <= 150) {
      return (
        <div className="currentAQI">
          <p>Your current Air Quality Index (AQI) is <b className="aqi3" style={{'color': 'rgb(155, 96, 19)', 'fontSize': '25px'}}>{currAQI}</b>  <button onClick={worstFinder}>Compare?</button><br></br>
          </p>
          <AirComparer {...worstAir}/>
        </div>
      )
    } else if (currAQI >= 151 && currAQI <= 200) {
      return (
        <div className="currentAQI">
          <p>Your current Air Quality Index (AQI) is <b style={{'backgroundColor': 'rgb(232, 158, 183)', 'fontSize': '25px'}}>{currAQI}</b>  <button onClick={worstFinder}>Compare?</button><br></br>
          </p>
          <AirComparer {...worstAir}/>
        </div>
      )
    } else if (currAQI >= 201 && currAQI <= 300) {
      return (
        <div className="currentAQI">
          <p>Your current Air Quality Index (AQI) is <b style={{'backgroundColor': 'rgb(213, 39, 213)', 'fontSize': '25px'}}>{currAQI}</b>  <button onClick={worstFinder}>Compare?</button><br></br>
          </p>
          <AirComparer {...worstAir}/>
        </div>
      )
    } else if (currAQI >= 301 && currAQI <= 500) {
      return (
        <div className="currentAQI">
          <p>Your current Air Quality Index (AQI) is <b style={{'color': 'rgb(107, 33, 130)', 'fontSize': '25px'}}>{currAQI}</b>  <button onClick={worstFinder}>Compare?</button><br></br>
          </p>
          <AirComparer {...worstAir}/>
        </div>
      )
    }

  } else {
    return (null)
  }
}


export default InnerAir