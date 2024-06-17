import { useEffect, useState } from 'react'
import GameOver from './components/gameOver'
import Card from './components/Card'
import './App.css'

function App() {
  // Creating a grid of cards
  let arrayOfImages = [
    {
      num: 1,
      img: 'https://heldersrvio.github.io/memory-card-game/static/media/wally.8036609c.png',
      isMatch: false
    },
    {
      num: 2,
      img: 'https://heldersrvio.github.io/memory-card-game/static/media/sasha.5e94ec83.jpg',
      isMatch: false
    },
    {
      num: 3,
      img: 'https://heldersrvio.github.io/memory-card-game/static/media/sylvia.fc5ee06d.png',
      isMatch: false
    },
    {
      num: 4,
      img: 'https://heldersrvio.github.io/memory-card-game/static/media/anne.d9d14c90.jpg',
      isMatch: false
    },
    {
      num: 5,
      img: 'https://heldersrvio.github.io/memory-card-game/static/media/sprig.57a1fbf3.png',
      isMatch: false
    },
    {
      num: 6,
      img: 'https://heldersrvio.github.io/memory-card-game/static/media/maddie.794635a6.jpg',
      isMatch: false
    }
  ]

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState([])
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [gameOver, setGameOver] = useState([false])
  const [bestScore, setBestScore] = useState(0)

  const shuffleImages = () => {
    // double the array 
    const shuffleArray = [...arrayOfImages, ...arrayOfImages]

    // add id 
    .map((item, index) => ({...item, id: index + 1 }));

    // shuffle
    shuffleArray.sort((a , b) => 0.5 - Math.random())    
    setScore(0)
    updateBestScore()
    setCards(shuffleArray)

  }
  // console.log(cards)

  // Effect for image shuffle 
  useEffect(() => {
    shuffleImages();
  }, []);

  // Effects for when the card is selected
  useEffect(() => {
    // console.log(selectedCard);
    if(selectedCard.length === 2){
      setTimeout(() => {
        setSelectedCard([]);
      }, 1000)
      checkMatch();
    }
  }, [selectedCard])

  // Effect to restart game over 
  useEffect(() => {
    if(score === arrayOfImages.length){
      console.log('Game Over')
      setTimeout(() => {
        shuffleImages()
        setGameOver(true)
      }, 1000)
    }
  }, [score])

  const checkMatch = () =>{
    if(selectedCard[0].num === selectedCard[1].num){
      // updating and re-render the scores 
      // setScore((prev) => prev + 1)
      setScore(score + 1)
      // An updated cards (check match)
      let updatedCards = cards.map((card) => {
        if(card.num === selectedCard[0].num){
          return {...card, isMatch: true}
        }
        return card
      })
      setCards(updatedCards)
    }else{
      // console.log("don't match")
      setTries(prev => prev + 1)
    }
  }
  // console.log(cards)

  // function to update bestScore 
  const updateBestScore = () => {
    if(score > bestScore){
      setBestScore(score)
    }else{
      setBestScore(bestScore + score)
      setGameOver(true)
    }
  }

  return (
    <>
      {gameOver && 
        <GameOver 
          score={score}
          bestScore={bestScore}
          tries={tries} 
          setGameOver={setGameOver}
          setBestScore={setBestScore}
          setTries={setTries}
          />
      }
      <div className='container'>
        <h1>Amphibia Memory Game</h1>
        <h3>
          Get points by clicking on any two image alike!
        </h3>

        {/* Render the Score  */}
        <div className="score-container">
          <div className="score">Score: {score}</div>
          <div className="tries">Tries: {tries}</div>
          <div className='bestScores'>Best scores: {bestScore}</div>
        </div>

        {/* Render the card child component */}
        <div className='cards-container'>
          {cards.map(card => (
            <Card key={card.id}
            card={card} 
            setSelectedCard={setSelectedCard} selectedCard={selectedCard} 
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
