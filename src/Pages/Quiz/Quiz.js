import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Question from "../../components/Question/Question";
import { getFormatedTime } from "../../helper";

import "./Quiz.css";

const Quiz = ({ 
        questions, 
        score, 
        timeTaken,
        setScore,
        setQuestions,
        setTimeTaken
    }) => {

    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const [error, setError] = useState(false);

    const history = useNavigate();
    
    let timer = 0;

    const startTimer = () => {
        questions && (
            timer = setInterval(() => {
               setTimeTaken(prev => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        quit();
                        setError("Time Out")
                        return prev;
                    }
                });
            }, 1000)
        )
    }

    useEffect(() => {
        setOptions(
            questions &&
                handleShuffle([
                questions[currQues]?.correct_answer,
                ...questions[currQues]?.incorrect_answers,
            ]),
        );
        startTimer();
       
        return() => clearInterval(timer);
        
    }, [currQues, questions]);

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
    };

    const quit = () => {
        setCurrQues(0);
        setQuestions();
    }

    const handleAgain = () => {
        setScore(0);
        history("/")
    }
    

    return ( 
        <div className="quiz">   
            {   
                error && 
                <>
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                 
                    <>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            style={{ width: "100%" }}
                            href="/"
                            onClick={() => handleAgain()}
                        >
                            Play Again
                        </Button>
                    </>
                
                </>
                
            } 
            {questions ? (
            <>
                <div className="quizInfo" style={{display: 'flex', justifyContent:"space-around"}}>
                    <span>
                        Score : {score}
                    </span>
                    {
                        (timeTaken > 10) ? (
                        <span>
                            Time : {getFormatedTime(timeTaken)}
                        </span>
                    ) : (
                        <span>
                           Time :  
                            <span style={{color: 'red', marginLeft: '4px'}}>
                                {getFormatedTime(timeTaken)}
                            </span>
                        </span>
                    )}
                </div>
                <Question
                    currQues={currQues}
                    setCurrQues={setCurrQues}
                    questions={questions}
                    options={options}
                    correct={questions[currQues]?.correct_answer}
                    score={score}
                    setScore={setScore}
                    setQuestions={setQuestions}
                />
            </>
            ) : (
                <CircularProgress
                    style={{ margin: 100 }}
                    color="inherit"
                    size={150}
                    thickness={1}
                />
            )}
        </div>
    );
}
 
export default Quiz;
