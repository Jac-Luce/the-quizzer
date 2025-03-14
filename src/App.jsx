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
  const [startQuiz, setStartQuiz] = useState(false); //Stato che determina l'inizio del quiz
  const [answers, setAnswers] = useState({}); //Stato per memorizzare le risposte
  const [questions, setQuestions] = useState([]); //Stato per memorizzare le domande
  const [quizFinished, setQuizFinished] = useState(false); //Stato che determina che il quiz è finito
  const [resultConfirmed, setResultConfirmed] = useState(false); //Stato che memorizza il risultato del quiz
  const [score, setScore] = useState(0); //Stato che conta il punteggio totale
  const [correctAnswers, setCorrectAnswers] = useState(0); //Stato delle domande corrette
  const [incorrectAnswers, setIncorrectAnswers] = useState(0); //Stato delle domande sbagliate

  //Funzione che controlla i dati dell'utente e inizia quiz
  const quizStart = (data) => {
    setQuestions(dataQuestions[data.subject]);
    setStartQuiz(true);
  };

  //Funzione che controlla il termine del quiz e salva le risposte dell'utente
  const finishQuiz = (answers) => {
    setAnswers(answers);
    setQuizFinished(true);
    setResultConfirmed(false); //Risultati non confermati subito
  };

  //Funzione che aggiorna le risposte in caso di modifica durante il riepilogo
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

  //Conferma qui e calcolo punteggio
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

  //Riavvia quiz e resetta stati 
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
