import moment from 'moment'
moment().format()

const GeneralInfo = (props) => {

  const dataCaptureDateTime = props.genInfo.airData.updatedAt
  const dataDateTime = new Date (dataCaptureDateTime)
  const localTime = moment().format('h:mm:ss a');

  const dataDateTimeSTR = dataDateTime.toLocaleString()
  const timeDiff = moment(dataDateTimeSTR, "MM/DD/YYYY HH:mm:ss a").fromNow();

  if (props.genInfo.airData.placeName !== '') {
    return (
      <div>
        <p> Here's your latest air pollution data for {props.genInfo.airData.placeName}, {props.genInfo.airData.state}.</p>
        <p> Latest avilable data was collected on {dataDateTime.toLocaleString()}, about {timeDiff} from your local time {localTime}.</p>

     </div>

    )
  }

}

export default GeneralInfo