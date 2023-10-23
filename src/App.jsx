import { useState } from "react";
import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Settings from "./components/Settings";
function App() {
  const [page, setPage] = React.useState("start");
  const [settings, setSettings] = React.useState({
    questionsAmount: "12",
    category: "any",
    difficulty: "any",
    type: "any",
  });

  let componentToRender;
  if (page === "settings") {
    componentToRender = (
      <Settings
        go_start={() => setPage("start")}
        setSettings={setSettings}
        settings={settings}
        go_quiz={() => setPage("quiz")}
      />
    );
  } else if (page === "quiz") {
    componentToRender = (
      <Quiz
        settings={settings}
        go_start={() => setPage("start")}
        go_settings={() => setPage("settings")}
        go_quiz={() => setPage("quiz")}
      />
    );
  } else {
    componentToRender = (
      <Start
        go_quiz={() => setPage("quiz")}
        go_settings={() => setPage("settings")}
      />
    );
  }
  return <>{componentToRender}</>;
}

export default App;
