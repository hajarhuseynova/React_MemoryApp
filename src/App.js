import { useEffect, useState } from "react";
import MemoryCard from "./Components/MemoryCard";

const cardList = [
  { path: "/img/1.jpeg", matched: false },
  { path: "/img/2.jpeg", matched: false },
  { path: "/img/3.jpeg", matched: false },
  { path: "/img/4.jpeg", matched: false },
  { path: "/img/5.jpeg", matched: false },
  { path: "/img/6.jpeg", matched: false },
  { path: "/img/7.jpeg", matched: false },
  { path: "/img/8.jpeg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setselectedOne] = useState(null);
  const [selectedTwo, setselectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelected = (card) => {
    selectedOne ? setselectedTwo(card) : setselectedOne(card);
  };
  const prepareCards = () => {
    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({
        ...card,
        id: Math.random(),
      }));
    setCards(sortedCards);
    setselectedOne(null);
    setselectedTwo(null);
    setScore(0);
  };
  useEffect(() => {
    prepareCards();
  }, []);
  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);
      if (selectedOne.path === selectedTwo.path) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.path === selectedOne.path) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);
  const resetState = () => {
    setselectedOne(null);
    setselectedTwo(null);
    setDisabled(false);
    setScore((prevScore) => prevScore + 1);
  };
  return (
    <div className="container">
      <h1>Memory App</h1>
      <button className="startButton" onClick={prepareCards}>
        Start Game
      </button>
      <p>{score}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <MemoryCard
            card={card}
            key={card.id}
            disabled={disabled}
            handleSelected={handleSelected}
            rotated={
              card === selectedOne || card === selectedTwo || card.matched
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
