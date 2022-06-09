import axios from 'axios'
import OutterAir from './airdata.jsx'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      zip: '',
      best: '',
      worst: '',
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
  }

  componentDidMount () {
    // axios.get('/zz',)
    // .then((incomingData)=>{
    //   console.log( 'axios get  incoming Data', incomingData)
    //   // this.setState({
    //   //   data: incomingData.data
    //   // })
    // })
    // .catch((err)=>{
    //   console.log( 'axios client err', err)
    // })
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
          this.setState({
            data: incomingData.data
          })

        })
        .catch((err)=>{
          console.log( 'axios client err', err)
        })
    }
  }

  render () {
    return (
      <div>


        <input className="zipInput" onChange={(e)=>{this.zipInput(e.target.value)}} name="zip" type="number" placeholder="Enter 5 digit zipcode"></input> <br></br>

        <button className="zipSubmit" type="submit" onClick={this.search}>submit</button>
        <hr></hr>

        <OutterAir airData={this.state.data}/>

        {/* <FireAir  /> */}

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))


/*

import axios  from 'axios'
import OutterAir from './airdata.jsx'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      zip: '',
      data: [{
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
      }]
    }
    this.search = this.search.bind(this)

  }

  zipInput (zipcode) {
    this.setState({
      zip: zipcode
    })
  }

  search () {

    if (this.state.zip.length === 5) {
      axios.post('/airq', {zipSearch: this.state.zip})
        .then((data)=>{
          this.setState({
            data: [data.data]
          })
        })
        .catch((err)=>{
          console.log( 'axios client err', err)
        })
    }
  }

  render () {
    return (
      <div>
        <div> Air Pollution Near me </div> <hr></hr>

        <input onChange={(e)=>{this.zipInput(e.target.value)}} name="zip" type="number" placeholder="Enter 5 digit zipcode"></input> <br></br>

        <button type="submit" onClick={this.search}>submit</button>
        <hr></hr>

        <OutterAir airData={this.state.data[0]}/>



        </div>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('main'))

*/