import React, { useState } from "react";
import "./TenziesProject.css";
import Die from "./Die";

export default function TenziesProject() {
  // this holds the 10 dice using useState
  const [dice, setDice] = useState(() => generateAllNewDice());

  // check if the game is won: all dice must be clicked + same value
  const gameWon =
    dice.every(die => die.isClicked) &&
    dice.every(die => die.value === dice[0].value);

  // this generates a new array of 10 dice objects
  function generateAllNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6), // random number from 1 to 6
        isClicked: false, // not frozen yet
        id: i + 1 // simple unique id
      });
    }

    return newDice;
  }

  // this rolls the dice that are not clicked/frozen
  function rollDice() {
    if (!gameWon) {
      setDice(oldDice =>
        oldDice.map(die =>
          die.isClicked
            ? die // don’t change if frozen
            : { ...die, value: Math.ceil(Math.random() * 6) } // re-roll
        )
      );
    } else {
      // if game is won, clicking button resets all dice
      setDice(generateAllNewDice());
    }
  }

  // when a die is clicked, toggle its "isClicked" status
  function hold(id) {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isClicked: !die.isClicked } : die
      )
    );
  }

  // create the actual visual dice using the Die component
  const diceElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isClicked={dieObj.isClicked}
      hold={hold}
      id={dieObj.id}
    />
  ));

  //  actual UI
  return (
    <div className="project-container">
      <main>
        <h1 className="title">{gameWon ? "Congrats, you won!" : "Let's play Tenzies!"}</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>

        <div className="dice-container">{diceElements}</div>

        <button className="roll-dice-btn" onClick={rollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
