import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateExam() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [validationError, setValidationError] = useState({})

    const createExam = async (e: any) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        await axios.post(`http://localhost:8000/api/exams`, formData).then(({ data }) => {
            console.log("then")
            navigate("/")
        }).catch(({ err }) => {
            console.log("error", { err })
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create exam</h4>
                            <hr />

                            <Form onSubmit={createExam}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control required type="text" value={name} onChange={(event) => {
                                                setName(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button variant="primary" className="mt-2" size="lg" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
} 