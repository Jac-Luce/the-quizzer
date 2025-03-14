import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form} from "react-bootstrap"; 

export default function UserForm({quizStart}) {
    const [name, setName] = useState(""); //Stato per il nome dell'utente
    const [surname, setSurname] = useState(""); //Stato per il cognome dell'utente
    const [email, setEmail] = useState(""); //Stato per l'email dell'utente
    const [age, setAge] = useState(""); //Stato per l'età dell'utente
    const [subject, setSubject] = useState(""); //Stato per la materia selezionata
    const [error, setError] = useState(""); //Stato per eventuali errori

    //Funziona che controlla che il form sia stato compilato, che l'età sia maggiore a 18 e che sia stata selezionata la materia
    const handleSubmit = (e) => {
        e.preventDefault();
        if (age >= 18 && subject !== "") {
            quizStart({name, surname, email, age, subject});
        } else {
            setError("Devi avere almeno 18 anni e selezionare una materia")
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="p-4 border rounded">
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Cognome" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="Età" value={age} onChange={(e) => setAge(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select onChange={(e) => setSubject(e.target.value)} value={subject} required>
                        <option value="">Seleziona materia</option>
                        <option value="Informatica">Informatica</option>
                        <option value="Musica">Musica</option>
                    </Form.Select>
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}
        
                <Button type="submit" variant="outline-primary">Inizia il quiz</Button>
            </Form>
        </>
    )
}