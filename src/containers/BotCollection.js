import React from 'react'
import BotCard from "../components/BotCard"

export default function BotCollection(props) {
  //your code here

  const displayBotCards = props.botCollection.map(bot => {
    return <BotCard bot={bot} action={props.action} />
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

