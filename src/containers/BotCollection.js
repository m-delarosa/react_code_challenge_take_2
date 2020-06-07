import React, { Component } from "react"
import BotCard from "../components/BotCard"

export default function BotCollection(props) {
  //your code here

  const displayBotCards = props.botCollection.map(bot => {
    return <BotCard bot={bot} />
  })


  return (
    <div className="ui four column grid">
      <div className="row">
        {displayBotCards}
          Collection of all bots
        </div>
    </div>
  )

}

