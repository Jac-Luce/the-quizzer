import React from "react";
import { Container, Button, ListGroup } from "react-bootstrap";

export default function Summary({answers, questions, onUpdateAnswers, onSubmit}) {

    return(
        <Container className="text-start">
            <h4 className="mb-4">Riepilogo</h4>
            {Array.isArray(questions) ? (
            questions.map((question, index) => (
                <Container key={index} className="mb-4">
                    <h6>{question.question}</h6>
                    
                    <ListGroup variant="flush">
                            {question.answers.map((answer, ansIndex) => (
                                <ListGroup.Item key={ansIndex} action className="border-0">
                                    <input
                                        type="checkbox"
                                        checked={answers[index]?.includes(ansIndex) || false}
                                        onChange={() => onUpdateAnswers(index, ansIndex)}
                                    />
                                    {answer.text}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                </Container>
            ))
            ) : (
                <p>Errore: domande non disponibili</p>
            )}
            <Container fluid className="text-center my-4">
                <Button variant="outline-success"  onClick={onSubmit}>Conferma Risultati</Button>
            </Container>
            
        </Container>
    )
}