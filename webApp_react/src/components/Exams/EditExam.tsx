import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Exam } from "../../types";

export default function CreateExam() {
    const navigate = useNavigate();
    
    const { id } = useParams()

    const [name, setName] = useState("")
    const [validationError, setValidationError] = useState({})

    useEffect(() => {
        fetchExams()
    }, [])

    const fetchExams = async () => {
        await axios.get(`http://localhost:8000/api/exams/${id}`).then(({ data }) => {
            setName(data.exam.name)
        })
    }

    const updateExam = async (e: any) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('name', name)

        await axios.post(`http://localhost:8000/api/exams/${id}`, formData).then(({ data }) => {
            navigate("/")
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update exam</h4>
                            <hr />

                            <Form onSubmit={updateExam}>
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