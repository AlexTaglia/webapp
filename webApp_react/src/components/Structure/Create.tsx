import React, { useCallback, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Exam } from "../../types";


export default function Create() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [region, setRegion] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [exams, setExams] = useState<Exam[]>([])
    const [examsIds, setExamsIds] = useState<number[]>([])


    useEffect(() => {
        fetchExams()
    }, [])
    

    const fetchExams = async () => {
        await axios.get(`http://localhost:8000/api/exams`).then(({ data }) => {
            setExams(data)
        })
    }

    const createProduct = async (e: any) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('name', name)
        formData.append('region', region)
        formData.append('city', city)
        formData.append('phone', phone)
        const ids = JSON.stringify(examsIds)
        formData.append('examsId', ids)

        await axios.post(`http://localhost:8000/api/structures`, formData).then(({}) => {
            console.log("then")
            navigate("/")
        }).catch(({ err }) => {
            console.log("error", { err })
        })
    }

    const handleCheck = useCallback(
      (checked: boolean, Id:number) => {
        
        if (checked && Id) {
            let ex = examsIds.concat(Id)
            setExamsIds(ex)
        } 
        else {
            let ex = examsIds
            console.log({ex})
            let index = ex.indexOf(Id)
            if (index !== -1) {
                ex.splice(index, 1);
            }
            setExamsIds(ex)
        }
      },
      [examsIds],
    )

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Structure</h4>
                            <hr />

                            <Form onSubmit={createProduct}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" required value={name} onChange={(event) => {
                                                setName(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col>
                                        <Form.Group controlId="Region">
                                            <Form.Label>Region</Form.Label>
                                            <Form.Control type="text" required value={region} onChange={(event) => {
                                                setRegion(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="City" className="mb-3">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control required type="text" onChange={(event) => {
                                                setCity(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Phone" className="mb-3">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control required type="text" onChange={(event) => {
                                                setPhone(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {exams?.map((exam) =>
                                    <div key={exam.id} className="lh-lg">
                                        <input
                                            onChange={(e) => handleCheck(e.target.checked, exam.id)}
                                            name={exam.name}
                                            className='align-middle'
                                            type='checkbox'
                                        />
                                        <label htmlFor={exam.name} className="me-5 ms-1">{exam.name}</label>
                                    </div>

                                )}
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