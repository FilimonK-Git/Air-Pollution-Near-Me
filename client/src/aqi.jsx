


const InnerAir = (props) => {
  console.log(' props in innerAir', props) // {aqi: value}

  if (props.aqi !== '') {
    // var currAQI =  Number(props.aqi.airData.AQI)
    // console.log('in propscurrAQI', currAQI)
    var currAQI = props.aqi

    if (currAQI >= 0 && currAQI <= 50) {
      return (
        <div>
          <p>Your current Air Quality Index (AQI) is <b style={{'color': 'green'}}>{currAQI}</b>,
          compared to the city,state with the worst nationwide AQI()</p>
        </div>
      )
    } else if (currAQI >= 51 && currAQI <= 100) {
      return (
        <div>
          <p>Your current Air Quality Index (AQI) is <b style={{'color': 'yellow'}}>{currAQI}</b>,
          compared to the city,state with the worst nationwide AQI(), and relative to the city,state with the best nationwide AQI() </p>
        </div>
      )
    }

  }

}

export default InnerAir