import React from "react";

export default function Start(props) {
  return (
    <div className="start">
      <h1 className="start__tittle">Quizzical</h1>
      <button
        onClick={props.go_quiz}
        className="start__button start__button__start"
      >
        START QUIZ
      </button>
      <button
        onClick={props.go_settings}
        className="start__button start__button__settings"
      >
        SETTINGS
      </button>
    </div>
  );
}
