
class App extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }



  render () {
    return (
      <div>
        <form method="post" action="/airq" >
          <input name="incomingPost" type="text"></input>
          <input type="submit" value="submit"></input>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))