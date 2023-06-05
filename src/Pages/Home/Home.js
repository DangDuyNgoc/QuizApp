import { useNavigate } from "react-router-dom";

import Quiz from "../../assets/quiz-removebg-preview.png"

const Home = ({ fetchQuestions }) => {
    const history = useNavigate();

    const handleSubmit = () => {
        fetchQuestions();
        history("/quiz");
    }

    return ( 
        <>  
            <div>
                <h1 className="header">Quizzical</h1>
                <div>
                    <img 
                        alt="Quiz"
                        src={Quiz}
                        width={280}
                    />
                </div>
                <button
                    className="start-btn"
                    onClick={handleSubmit}
                >
                    Start quiz
                </button>
            </div>
        </>
    );
}
 
export default Home;