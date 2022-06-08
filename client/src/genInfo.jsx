import moment from 'moment'
moment().format()

const GeneralInfo = (props) => {

  const dataCaptureDateTime = props.genInfo.airData.updatedAt
  const dataDateTime = new Date (dataCaptureDateTime)
  const localTime = moment().format('h:mm:ss a');

  let timeDiff = moment.utc(moment().diff(moment(dataDateTime.toLocaleString(),"DD/MM/YYYY HH:mm:ss"))).format("HH:mm")

  if (props.genInfo.airData.placeName !== '') {
    return (
      <div>
        <p> Here's your latest air pollution data for {props.genInfo.airData.placeName}, {props.genInfo.airData.state}.</p>
        <p> Latest avilable data was collected on {dataDateTime.toLocaleString()}, about {timeDiff.slice(1,2)} hour and {timeDiff.slice(3)} minutes ago from your local time {localTime}.</p>

        <p>Your current Air Quality Index (AQI) is {props.genInfo.airData.AQI}</p>
     </div>

    )
  }

}

export default GeneralInfo