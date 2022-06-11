import axios from 'axios'
import OutterAir from './airdata.jsx'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      zip: '',
      worst: '',
      badZip: false,
      data: {
        placeName: '',
        state: '',
        postalCode: '',
        PM25: '',
        OZONE: '',
        CO: '',
        NO2: '',
        SO2: '',
        updatedAt: '2000-01-01 00:00:00',
        AQI: ''
      }
    }
    this.search = this.search.bind(this)
    this.findWorst = this.findWorst.bind(this)
  }

  componentDidMount () {

  }

  findWorst() {
    axios.get('/worst&best')
    .then((incomingData)=>{
      console.log( 'axios get findWorst incoming Data', incomingData.data) // [{worst}, {best}]
      this.setState({
        worst: incomingData.data[0]
      })
    })
    .catch((err)=>{
      console.log( 'axios client err', err)
    })
  }


  zipInput (zipcode) {
    this.setState({
      zip: zipcode
    })
  }


  search () {

    if (this.state.zip.length === 5) {
      axios.post('/airq', {zipSearch: this.state.zip})
        .then((incomingData)=>{
          console.log( 'axios client  incoming Data', incomingData)

          if (incomingData.data === 'Data not available!') {
            this.setState({
              badZip: true
            })
          } else {

            this.setState({
              badZip: false,
              data: incomingData.data
            })
          }

        })
        .catch((err)=>{
          console.log( 'axios client err', err)
        })
    }
  }

  render () {

    if (this.state.badZip) {

      return (
        <div>
          <h2 className="title"> Air Pollution Near me </h2>
          <input className="zipInput" onChange={(e)=>{this.zipInput(e.target.value)}} onKeyPress={this.search} name="zip" type="number" placeholder="Enter 5 digit zipcode"></input> <br></br>

          <button className="zipSubmit" type="submit" onClick={this.search}>submit</button>

        <hr></hr>
        <h4>Data for provided zip not available, or zipcode doesn't exisit.</h4>
        <hr></hr>

        <img src="us_aqi.png"></img>

          <p className="info">For more information, visit U.S. EPA's <a href="https://gispub.epa.gov/airnow/?monitors=none&contours=pm25&tab=current&showlegend=yes&xmin=-17608645.331997138&xmax=-1484712.837413204&ymin=2956891.6757645914&ymax=9619754.557325065" target="_blank">AirNow</a> live AQI map below</p>
          <div class="map">
            <iframe src="https://gispub.epa.gov/airnow/?monitors=none&contours=pm25&tab=current&xmin=-17608645.331997138&xmax=-4302487.448117193&ymin=2086121.0495400939&ymax=7271609.048405073" >
            </iframe>
          </div>

          {/* <FireAir   /> */}
            {/* https://fire.airnow.gov/ */}


        </div>
      )

    } else {


      return (
        <div>
          <h2 className="title"> Air Pollution Near me </h2>
          <input className="zipInput" onChange={(e)=>{this.zipInput(e.target.value)}} onKeyPress={this.search} name="zip" type="number" placeholder="Enter 5 digit zipcode"></input> <br></br>

          <button className="zipSubmit" type="submit" onClick={this.search}>submit</button>
          <br></br>

          <OutterAir airData={this.state.data} worstAir={this.state.worst} worstFinder={this.findWorst}/>
          <img src="us_aqi.png"></img>

          <p className="info">For more information, visit U.S. EPA's <a href="https://gispub.epa.gov/airnow/?monitors=none&contours=pm25&tab=current&showlegend=yes&xmin=-17608645.331997138&xmax=-1484712.837413204&ymin=2956891.6757645914&ymax=9619754.557325065" target="_blank">AirNow</a> live AQI map below</p>
          <div class="map">
            <iframe src="https://gispub.epa.gov/airnow/?monitors=none&contours=pm25&tab=current&xmin=-17608645.331997138&xmax=-4302487.448117193&ymin=2086121.0495400939&ymax=7271609.048405073" >
            </iframe>
          </div>

          {/* <FireAir   /> */}
            {/* https://fire.airnow.gov/ */}


        </div>
      )




    }





  }
}

ReactDOM.render(<App />, document.getElementById('main'))

