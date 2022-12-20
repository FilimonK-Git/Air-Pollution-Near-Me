import React, {FC} from 'react'

type worstAir = {
  placeName: string,
  state: string,
  countryCode: string,
  AQI: number,
  PM25: number
}

export function AirComparer  ({placeName, state, countryCode, AQI, PM25} :worstAir) {
console.log('pl',placeName)
  if (placeName) {

      return (
        <div>
          <p>
          Globally, the worst current AQI is reported from {placeName} {state}, {countryCode} with an AQI of <b>{AQI}</b>, due to high pollutant levels such as PM2.5 {PM25} (ug/m3)</p>

        </div>
      )
  } else {
    return (null)
  }

}

// export default AirComparer