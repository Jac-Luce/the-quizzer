import './App.css';
import React from 'react';
import { useState } from 'react';
import UserForm from './components/UserForm.jsx';
import Quiz from './components/Quiz.jsx';
import Summary from './components/Summary.jsx';
import Dashboard from './components/Dashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import dataQuestions from '../src/data/questions.json';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [resultConfirmed, setResultConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const quizStart = (data) => {
    setQuestions(dataQuestions[data.subject]);
    setStartQuiz(true);
  };

  const finishQuiz = (answers) => {
    setAnswers(answers);
    setQuizFinished(true);
    setResultConfirmed(false); //Risultati non confermati subito
  };

  const updateAnswers = (questionIndex, answerIndex) => {
    setAnswers((prev) => {
      const prevAnswers = prev[questionIndex] || [];
      const newAnswers = prevAnswers.includes(answerIndex)
          ? prevAnswers.filter((a) => a !== answerIndex) // Rimuove la risposta se già selezionata
          : [...prevAnswers, answerIndex]; // Aggiunge la risposta se non selezionata

      return {
          ...prev,
          [questionIndex]: newAnswers,
      };
    });
  };

  const confirmResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((question, index) => {
        const selectedAnswers = answers[index] || [];
        const correctAnswers = question.answers
            .map((answer, idx) => (answer.correct ? idx : null))
            .filter(idx => idx !== null);

        if (
            selectedAnswers.length > 0 &&
            selectedAnswers.every(ans => correctAnswers.includes(ans)) &&
            selectedAnswers.length === correctAnswers.length
        ) {
            correctCount++; 
        } else {
            incorrectCount++;
        }
    });

    setScore(correctCount * 10);
    setCorrectAnswers(correctCount);
    setIncorrectAnswers(incorrectCount);
    setResultConfirmed(true);
  };

  const restartQuiz = () => {
    setStartQuiz(false);
    setQuizFinished(false);
    setAnswers({});
    setResultConfirmed(false);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  };

  return (
    <Container className='mt-5 text-center'>
      <Row>
        <Col>
          <h1 className='mb-5'>The Quizzer</h1>
          {!startQuiz && !quizFinished && <UserForm quizStart={quizStart} /> }
          {startQuiz && !quizFinished && <Quiz questions={questions} onFinish={finishQuiz}/>}
          {quizFinished && !resultConfirmed && ( <Summary answers={answers} questions={questions} onUpdateAnswers={updateAnswers} onSubmit={confirmResults}/>)}
          {resultConfirmed && (
            <Dashboard score={score} correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} onRestart={restartQuiz}/>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
