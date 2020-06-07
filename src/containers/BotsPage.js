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

  removeFromArmy = (bot) => {
    let newCollection = this.state.botArmy.filter(card => card !== bot)
    this.setState({ botArmy: newCollection })
  }

  removeBotPermanently = (bot) => {
    let newCollection = this.state.botCollection.filter(card => card !== bot)
    let newArmy = this.state.botArmy.filter(card => card !== bot)

    this.setState({ botCollection: newCollection, botArmy: newArmy })
  }

  render() {
    return (
      <div>
        <BotArmy bots={this.state.botArmy} action={this.removeFromArmy} removeCard={this.removeBotPermanently} />
        <BotCollection botCollection={this.state.botCollection} action={this.addToArmy} removeCard={this.removeBotPermanently} />
      </div>

    )
  }
}

export default BotsPage
