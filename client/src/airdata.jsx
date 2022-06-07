
const OutterAir = (props) => {
  console.log('outter props', props)

  const dataCaptureDateTime = props.airData.updatedAt
  const localDate = new Date (dataCaptureDateTime)





  const newlocalCurrentDateTime = new Date ()
  const localCurrentDateTime = newlocalCurrentDateTime.toLocaleString()

  return (


    <div>

    <p> Here's your latest air pollution data for {props.airData.placeName}, {props.airData.state}</p>
    <p> Latest avilable data was collected {localDate.toString()} UTC xxx hours ago from you local time {localCurrentDateTime}</p>


    <table>
      <body>

        <tr>
          <td> Pollutant </td>
          <td> Concentration </td>
          <td> Unit </td>
        </tr>

        <tr>
          <td> Fine particles </td>
          <td> {Number(props.airData.PM25).toFixed(1)}</td>
          <td> ug/m3 </td>
        </tr>

        <tr>
          <td> Ozone </td>
          <td> {Number(props.airData.OZONE).toFixed(1)}</td>
          <td> ppb </td>
        </tr>

        <tr>
          <td> Carbon monoxide</td>
          <td> {Number(props.airData.CO).toFixed(1)}</td>
          <td> ppm </td>
        </tr>

        <tr>
          <td> Nitrogen dioxide </td>
          <td> {Number(props.airData.NO2).toFixed(1)}</td>
          <td> ppb </td>
        </tr>

        <tr>
          <td> Sulfur dioxide  </td>
          <td> {Number(props.airData.SO2).toFixed(1)}</td>
          <td> ppb </td>
        </tr>




      </body>
    </table>

    </div>

  )

}

export default OutterAir







