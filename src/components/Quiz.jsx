import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, ListGroup, Pagination } from "react-bootstrap";

export default function Quiz({questions, onFinish}) {
    
    const [answers, setAnswers] = useState({}); //Stato per memorizzare le risposte dell'utente
    const [currentQuestion, setCurrentQuestion] = useState(0); //Indice della domanda corrente

    //Funzione per gestire il cambio di risposta per una domanda specifica
    const answerChange = (questionIndex, answerIndex) => {
        setAnswers((prev) => {
            const prevAnswers = prev[questionIndex] || []; //Se non esiste l'arrey ne inizializza uno come array vuoto
            const newAnswers = prevAnswers.includes(answerIndex)
                ? prevAnswers.filter((a) => a !== answerIndex) //Rimuove la risposta se già selezionata
                : [...prevAnswers, answerIndex]; //Aggiunge la risposta se non è selezionata

            return {
                ...prev, [questionIndex]: newAnswers, //Aggiorna solo la domanda specifica
            };
        })
    }

    //Funzione che gestisce i tasti precedente/successivo
    const handleNavigation = (direction) => {
        setCurrentQuestion((prev) => Math.max( 0, Math.min(questions.length - 1, prev + direction)))
    };

    //Funzione per la paginazione
    const numberPagination = (index) => {
        setCurrentQuestion(index);
    };

    return (
        <Container className="text-start">
            {questions.length > 0 && (
            <>
                {/**Mostra la domanda attuale */}
                <h2>{questions[currentQuestion].question}</h2>
                <ListGroup variant="flush">
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <ListGroup.Item key={index} action className="border-0">
                            <input
                                type="checkbox"
                                checked= {Array.isArray(answers[currentQuestion]) && answers[currentQuestion].includes(index)}
                                onChange={() => answerChange(currentQuestion, index)}
                            />
                            {answer.text}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/**Pulsanti di navigazione */}
                <Container className="d-flex justify-content-between mt-3">
                    <Button variant="outline-primary" onClick={() => handleNavigation(-1)} disabled={currentQuestion === 0}>Precedente</Button>
                    <Button variant="outline-primary" onClick={() => handleNavigation(1)} disabled={currentQuestion === questions.length - 1}>Successivo</Button>
                </Container>

                {/**Navigazione numerata */}
                <Pagination className="justify-content-center mt-3">
                    {questions.map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index === currentQuestion}
                            onClick={() => numberPagination(index)}
                            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination><br/>
            </>
            )}

            {/**Pulsante Avanti visibile solo nell'ultima domanda */}
            <Container fluid className="text-center mt-5">
                {currentQuestion === questions.length - 1 && (
                    <Button variant="outline-primary"  onClick={() => onFinish(answers)}>Avanti</Button>)
                }
            </Container>
            
            
        </Container>
    )
}