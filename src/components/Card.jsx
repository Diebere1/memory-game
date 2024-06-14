import { useState, useEffect } from "react";

function Card ({card, setSelectedCard, selectedCard}) {
  // console.log(card);
  const [isFlipped, setIsFlipped] = useState(false)
  const handleClick = () => {
    // console.log('clicked');
    setSelectedCard([...selectedCard, card]);
  }

  useEffect(() => {
    if(selectedCard[0] === card || 
      selectedCard[1] === card || 
      card.isMatch) {
      setIsFlipped(true);
    }else{
      setIsFlipped(false)
    }
  }, [selectedCard])
  
  return (
    <div className={isFlipped ? 
      "card open stop-clicking" : "card"} 
    onClick={handleClick}>
      <div className="front">
        <img src={card.img} alt="" />
      </div>
      <div className="back"></div>
    </div>
  )
}

export default Card;