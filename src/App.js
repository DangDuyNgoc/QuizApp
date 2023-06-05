import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Results/Results';


function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(60);

  const fetchQuestions = async () => {
    const { data } = await axios.get(
      "https://opentdb.com/api.php?amount=5"
    );
    setQuestions(data.results);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="app">
          <Routes>
              <Route path="/" element={
                <Home 
                  fetchQuestions={fetchQuestions}
                />
              } />

              <Route path="/quiz" element={
                <Quiz 
                  questions={questions}
                  score={score}
                  timeTaken={timeTaken}
                  setScore={setScore}
                  setQuestions={setQuestions}
                  setTimeTaken={setTimeTaken}
                />
              } />

              <Route path="/result" element={
                <Result classNam="result"
                  questions={questions}
                  score={score}
                  timeTaken={timeTaken}
                  setScore={setScore}
                  setTimeTaken={setTimeTaken}
                />
              } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
