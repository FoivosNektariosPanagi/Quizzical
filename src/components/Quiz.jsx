import React, { useState, useEffect } from "react";
import Question from "./Question";
export default function Quiz(props) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submited, setSubmited] = useState(false);
  const [score, setScore] = useState(0);

  const [dummyState, setDummyState] = useState(0); // Initialize dummy state

  // Function to force a re-render
  const forceRerender = () => {
    setDummyState((prevDummy) => prevDummy + 1); // Increment dummy state to cause a re-render
    setSubmited(false);
  };

  useEffect(() => {
    const apiURL =
      `https://opentdb.com/api.php?amount=${props.settings.questionsAmount}` +
      `${
        props.settings.category === "any"
          ? ""
          : `&category=${props.settings.category}`
      }` +
      `${
        props.settings.difficulty === "any"
          ? ""
          : `&difficulty=${props.settings.difficulty}`
      }` +
      `${props.settings.type === "any" ? "" : `&type=${props.settings.type}`}`;

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [props.settings, dummyState]);

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return (
      <div className="error_carts">
        <div className="error_carts__top">
          <div>You're offline</div>
          <img
            src={"../src/assets/🤷_♂️.svg"}
            alt="🤷"
            width="40"
            height="40"
          />
        </div>
        <h3>Thus you can't request new questions</h3>
        <div>
          <button onClick={props.go_start} className="simple_button ">
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (data.results.length < props.settings.questionsAmount) {
    return (
      <div className="error_carts">
        <div className="error_carts__top">
          <div>
            There are no quiz questions with this data please change your
            settings
          </div>
          <img
            src={"../src/assets/🤷_♂️.svg"}
            alt="🤷"
            width="40"
            height="40"
          />
        </div>

        <button onClick={props.go_start} className=" simple_button ">
          Reload
        </button>
        <h3>
          Most probably there are no questions for such combination of settings.
          Try to change settings.
        </h3>
        <div>
          <button onClick={props.go_settings} className="simple_button ">
            Update settings
          </button>
        </div>
      </div>
    );
  }

  function goUp() {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This provides a smooth scrolling animation
    });
  }

  return (
    <div className="quiz">
      <div className="quiz__header">
        <h1>Quizical</h1>
        <img
          onClick={props.go_settings}
          className="gear_icon"
          src={"/src/assets/gear_icon.svg"}
          alt="Gear"
          width="32"
          height="32"
        />

        <img
          onClick={props.go_start}
          className="xicon"
          src={"/src/assets/X_icon.svg"}
          alt="X"
          width="32"
          height="32"
        />
      </div>

      <div>
        {submited ? (
          <div className="score">
            <div className="score__top">
              <h1>The quiz is finished!</h1>
              <img
                src={"../src/assets/🏆.svg"}
                alt="🏆"
                width="40"
                height="40"
              />
            </div>
            <div className="score__bottom">
              <h2>
                Correct answers:{" "}
                <span className="score__count">
                  {score} / {props.settings.questionsAmount}
                </span>
              </h2>
              <button onClick={forceRerender} className="simple_button">
                Start New Game
              </button>
            </div>
          </div>
        ) : null}

        {data.results.map((question, index) => (
          <Question
            key={index}
            question={question}
            submited={submited}
            setScore={setScore}
          />
        ))}
      </div>
      {!submited ? (
        <>
          <button
            onClick={() => {
              setSubmited(true);
              goUp();
            }}
            className="simple_button"
          >
            Check answers
          </button>
          <button onClick={forceRerender} className="simple_button">
            New Quiz
          </button>
          <button onClick={props.go_start} className="simple_button">
            Exit
          </button>
        </>
      ) : (
        <button onClick={forceRerender} className="simple_button">
          New Game
        </button>
      )}
    </div>
  );
}
