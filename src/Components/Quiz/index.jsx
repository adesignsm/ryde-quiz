import { useState } from 'react';
import { push, ref } from "firebase/database";
import { db } from "../../firebase";

import './index.css';
import questions from '../../questions.json';

import RED_BG from '../../Assets/red-bg.png';
import YELLOW_BG from '../../Assets/yellow-bg.png';
import BLUE_BG from '../../Assets/blue-bg.png';

import LOGO from '../../Assets/logo.svg';
import { End } from '../End';

export const Quiz = ({ user }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [checkedIndex, setCheckedIndex] = useState(null);
    const [count, setCount] = useState(1);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [nextQuestion, setNextQuestion] = useState(false);
    const [answers] = useState([]);
    const [lastQuestionAnswered, setLastQuestionAnswered] = useState(false);

    const backgrounds = [
        RED_BG,
        YELLOW_BG,
        BLUE_BG
    ];

    const backgroundStyle = {
        backgroundImage: `url(${backgrounds[backgroundIndex]})`
    }

    const handleCheckboxChange = (index) => {
        setCheckedIndex(index);
    };

    const handleNextButton = () => {
        const currentQuestion = Object.values(questions)[0][currentIndex];

        if (checkedIndex !== null) {
            const selectedAnswer = currentQuestion.options[checkedIndex];
            setNextQuestion(true);
            answers.push(selectedAnswer);

            setTimeout(() => {
                if (backgroundIndex === backgrounds.length - 1) {
                    setBackgroundIndex(0);
                } else {
                    setBackgroundIndex(backgroundIndex + 1);
                }

                setCount((prevCount) => prevCount + 1);
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setCheckedIndex(null);
                setNextQuestion(false);

                if (currentIndex === Object.values(questions)[0].length - 1) {
                    console.log("Last question answered.");
                    setLastQuestionAnswered(true);
                    pushDataToFirebase();
                }
            }, 1000);
        } else {
            alert('Please select one of the three answers!');
        }
    }

    const pushDataToFirebase = () => {
        const userDataWithAnswers = {
            name: user.name,
            email: user.email,
            answers: answers
        };

        const userAnswersRef = ref(db, `user_answers`);
        push(userAnswersRef, userDataWithAnswers).then(() => {
            console.log("Data pushed to Firebase successfully!");
        }).catch((error) => {
            console.error("Error pushing data to Firebase: ", error);
        });
    }

    console.log(answers)
 
    return (
        <>
           {!lastQuestionAnswered ? (
                <div className='quiz-container'>
                    <div className='left-column' style={backgroundStyle}>
                        <div className='header'>
                            <img src={LOGO} />
                            <h1>Question {count}/10</h1>
                        </div>
                        <h1 className='question'>{Object.values(questions)[0][currentIndex].question}</h1>
                    </div>
                    <div className='right-column'>
                        <div className='answers'>
                            {Object.values(questions)[0][currentIndex].options.map((option, index) => {
                                return (
                                    <div className='answer'>
                                        <input 
                                            type="checkbox" 
                                            className='answer' 
                                            name="answer" 
                                            value={option}
                                            checked={checkedIndex === index}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <label 
                                            htmlFor="answer"
                                            className={
                                                nextQuestion ? (
                                                    option === Object.values(questions)[0][currentIndex].correctAnswer
                                                        ? 'correct-answer'
                                                        : 'wrong-answer'
                                                ) : ''
                                            }
                                        >
                                            {option}
                                        </label>
                                    </div>
                                )
                            })}
                            <button className='next-button' onClick={() => handleNextButton()}>Continue</button>
                        </div>
                    </div>
                </div>
           ) : (
            <End />
           )}
        </>
    )
}