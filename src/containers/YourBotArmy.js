import React, { Component } from "react"
import BotCard from "../components/BotCard"

export default function YourBotArmy(props) {

  const displayBots = props.bots.map(bot => {
    return <BotCard bot={bot} />
  })


  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {displayBots}
        </div>
      </div>
    </div>
  )

}

