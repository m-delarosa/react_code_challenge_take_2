import React, { Component } from "react"
import BotCollection from './BotCollection'
import BotArmy from './YourBotArmy'
import BotSpecs from '../components/BotSpecs'



class BotsPage extends Component {
  //start here with your code for step one

  state = {
    botCollection: [],
    botArmy: [],
    collectionVisible: true,
    botSpecs: {}
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

    fetch(`http://localhost:6001/bots/${bot.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => console.log(result))
  }

  displayBotSpecs = (bot) => {
    this.setState({ collectionVisible: false })
    this.setState({ botSpecs: bot })
  }

  displayBotCollection = () => {
    this.setState({ collectionVisible: true })
  }

  render() {
    return (
      <div>
        <BotArmy bots={this.state.botArmy} action={this.removeFromArmy} removeCard={this.removeBotPermanently} />
        {this.state.collectionVisible
          ? < BotCollection botCollection={this.state.botCollection} action={this.displayBotSpecs} removeCard={this.removeBotPermanently} />
          : < BotSpecs bot={this.state.botSpecs} back={this.displayBotCollection} enlist={this.addToArmy} />
        }
      </div>

    )
  }
}

export default BotsPage
