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
    botSpecs: {},
    botArmyClasses: [],
    botArmyIds: []
  }

  componentDidMount() {
    fetch('http://localhost:6001/bots')
      .then(response => response.json())
      .then(bots => this.setState({ botCollection: bots }))
      .then(console.log("Bots Fetched!"))
  }

  addToArmy = (bot) => {
    let newCollection = this.state.botCollection.filter(card => card.bot_class !== bot.bot_class)
    this.setState({
      botCollection: newCollection,
      botArmy: [...this.state.botArmy, bot],
      collectionVisible: true,
      botArmyClasses: [...this.state.botArmyClasses, bot.bot_class],
      botArmyIds: [...this.state.botArmyIds, bot.id]
    })
  }

  removeFromArmy = (bot) => {
    let newArmy = this.state.botArmy.filter(card => card !== bot)
    this.componentDidMount()
    let newCollection = this.state.botCollection.filter(card => this.state.botArmyIds.includes(card.id) === false)
    // Not sure how to make the expression below work the way I want it to:
    // I want it to filter the botCollection and check each id against each id in the botArmy and filter matches out. 
    // Do I need to create new state that hold the id numbers that just holds the current ids of bots in the bot army?
    // this.setState({ botArmy: newArmy, botCollection: [this.state.botCollection.filter(card => card.id !== )] })
    // Or maybe I create an initial bot collection state or variable that doesn't change, and use it to refilter over and over.
    this.setState({ botArmy: newArmy, botCollection: newCollection })
    console.log("New collection filtered.")
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
