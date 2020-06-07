import React, { Component } from "react"
import BotCollection from './BotCollection'



class BotsPage extends Component {
  //start here with your code for step one

  state = {
    botCollection: [],
    botArmy: []
  }

  componentDidMount() {
    fetch('http://localhost:6001/bots')
      .then(response => response.json())
      .then(bots => this.setState({ botCollection: bots }))
  }
  render() {
    return (
      <div>
        <BotCollection botCollection={this.state.botCollection} />
      </div>

    )
  }
}

export default BotsPage
