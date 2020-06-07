import React, { Component } from "react"
import BotCollection from './BotCollection'
import BotArmy from './YourBotArmy'



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

  addToArmy = (bot) => {
    if (!this.state.botArmy.find(card => card.id === bot.id))
      this.setState({ botArmy: [...this.state.botArmy, bot] })
  }

  render() {
    return (
      <div>
        <BotArmy bots={this.state.botArmy} />
        <BotCollection botCollection={this.state.botCollection} action={this.addToArmy} />
      </div>

    )
  }
}

export default BotsPage
