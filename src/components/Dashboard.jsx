import React from "react";
import { Container, Button } from "react-bootstrap";

export default function Dashboard({score, correctAnswers, incorrectAnswers, onRestart}) {

    return(
        <Container className="pt-5">
            <h3 className="mb-4">Punteggio: {score}</h3>
            <h6>Risposte corrette: {correctAnswers}</h6>
            <h6 className="mb-5">Risposte sbagliate: {incorrectAnswers}</h6>
            <Button variant="outline-primary" onClick={onRestart} size="sm">Ripeti quiz</Button>
        </Container>
    )
}