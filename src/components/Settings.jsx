import React from "react";

export default function Settings(props) {
  function handleChange(event) {
    const { name, value } = event.target;
    let newValue = value; // Initialize with the value from the event

    if (name === "questionsAmount") {
      console.log("questionsAmount");
      newValue = parseInt(value, 10); // Parse as base 10 integer

      // Ensure the value is within the range of 1 to 50
      if (newValue < 1) {
        newValue = 1;
      } else if (newValue > 50) {
        newValue = 50;
      }
    }

    props.setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [name]: newValue,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // submitToApi(formData)
    console.log("submit button");
  }

  return (
    <div className="settings">
      <div className="settings__title">
        <h1>Settings </h1>
        <img
          onClick={props.go_start}
          className="xicon"
          src={"/X_icon.svg"}
          alt="X"
          width="32"
          height="32"
        />
      </div>
      <div className="settings__main">
        <label htmlFor="questionsAmount" className="settings__main__label">
          AMOUNT OF QUESTIONS
        </label>
        <input
          className="settings__main__input"
          type="number" // Use "number" type for integers
          placeholder="Amount Of Questions"
          onChange={handleChange}
          name="questionsAmount"
          value={props.settings.questionsAmount}
        />
        <label className="settings__main__label1-50">
          Enter a number between 1 and 50.
        </label>
        <br />
        <label htmlFor="category" className="settings__main__label">
          CATEGORY
        </label>
        <select
          className="settings__main__input"
          id="category"
          value={props.settings.category}
          onChange={handleChange}
          name="category"
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
        <br />
        <label htmlFor="difficulty" className="settings__main__label">
          DIFFICULTY
        </label>
        <select
          className="settings__main__input"
          id="difficulty"
          value={props.settings.difficulty}
          onChange={handleChange}
          name="difficulty"
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        <label htmlFor="type" className="settings__main__label">
          TYPE
        </label>
        <select
          className="settings__main__input"
          id="type"
          value={props.settings.type}
          onChange={handleChange}
          name="type"
        >
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
        <br />
        <button
          onClick={props.go_quiz}
          className="start__button start__button__start"
        >
          START QUIZ
        </button>
      </div>
    </div>
  );
}
