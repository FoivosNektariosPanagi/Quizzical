import { set } from "immutable";
import React, { useState, useEffect } from "react";

export default function Question({ question, submited, setScore }) {
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  console.log(question);
  useEffect(() => {
    // Create a copy of the incorrect answers and insert the correct answer
    const shuffledAnswers = [...question.incorrect_answers];
    const randomIndex = Math.floor(
      Math.random() * (shuffledAnswers.length + 1)
    );
    shuffledAnswers.splice(randomIndex, 0, question.correct_answer);

    // Set the shuffled answers in the component's state
    setIncorrectAnswers(shuffledAnswers);
  }, [question]);

  function handleButtonClick(answer) {
    if (!submited) {
      setSelectedAnswer(answer);
    }
  }

  function getButtonClass(answer) {
    if (selectedAnswer === answer) {
      if (!submited) {
        return "selected";
      } else if (answer === question.correct_answer) {
        return "correct";
      } else {
        return "incorrect";
      }
    } else if (submited && answer === question.correct_answer) {
      return "correct";
    }
    return "";
  }

  useEffect(() => {
    if (submited && selectedAnswer === question.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [submited]);

  return (
    <div
      className={
        "default__card " +
        (submited
          ? selectedAnswer === question.correct_answer
            ? "correct_background"
            : "incorrect_background"
          : "")
      }
    >
      <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="buttonsAndIcon">
        {incorrectAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(answer)}
            className={"default__card__button " + getButtonClass(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}

        {submited ? (
          <img
            className="result_icon"
            src={
              selectedAnswer === question.correct_answer
                ? "../src/assets/✅.svg"
                : "../src/assets/🚫.svg"
            }
            alt={selectedAnswer === question.correct_answer ? "✅" : "🚫"}
            width="40"
            height="40"
          />
        ) : (
          ""
        )}
      </div>
      <div className="categorys_div">
        <span className="categorys">{question.category}</span>
        <span className="categorys">{question.difficulty}</span>
      </div>
    </div>
  );
}
