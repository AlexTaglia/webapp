import React, { useCallback, useEffect, useMemo, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Exams } from "../Exams/Exams";
import { Exam } from "../../types";

export default function Edit() {
    const navigate = useNavigate();

    const { id } = useParams()

    const [name, setName] = useState("")
    const [region, setRegion] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [allExams, setAllExams] = useState<Exam[]>([])
    const [exams, setExams] = useState<Exam[]>([])
    const [examsIds, setExamsIds] = useState<number[]>([])
    const [existingExams, setExistingExams] = useState<number[]>([])

    useEffect(() => {
        fetchStructure()
        fetchExams()
    }, [])

    useEffect(() => {
        if (exams) {
            let idsExams = exams.map((exam) => exam.id)

            setExistingExams(idsExams ?? [])

        }
    }, [exams])

    const fetchStructure = async () => {
        await axios.get(`http://localhost:8000/api/structures/${id}`).then(({ data }) => {

            const { name, region, city, phone } = data.structure
            setName(name)
            setRegion(region)
            setCity(city)
            setPhone(phone)

            let extras: Exam[] = []

            data.structureexams?.forEach((item: { exam_id: number; name: string; }) => {
                const option = {
                    id: item.exam_id,
                    name: item.name
                }
                extras?.push(option)
            });

            setExams(extras)


        }).catch(({ response: { data } }) => {

        })
    }

    const fetchExams = async () => {
        await axios.get(`http://localhost:8000/api/exams`).then(({ data }) => {
            setAllExams(data)
        })
    }


    const updateStructure = async (e: any) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('name', name)
        formData.append('region', region)
        formData.append('city', city)
        formData.append('phone', phone)

        await axios.post(`http://localhost:8000/api/structures/${id}`, formData).then(({ data }) => {
            navigate("/")
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    const handleCheck = useCallback(
        (checked: boolean, Id: number) => {

            if (checked && Id) {
                let ex = examsIds.concat(Id)
                setExamsIds(ex)
            }
            else {
                let ex = examsIds
                console.log({ ex })
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
                            <h4 className="card-title">Update Structure</h4>
                            <hr />

                            <Form onSubmit={updateStructure}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={name} onChange={(event) => {
                                                setName(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col>
                                        <Form.Group controlId="Region">
                                            <Form.Label>Region</Form.Label>
                                            <Form.Control type="text" value={region} onChange={(event) => {
                                                setRegion(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="City" className="mb-3">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" value={city} onChange={(event) => {
                                                setCity(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Phone" className="mb-3">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="text" value={phone} onChange={(event) => {
                                                setPhone(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="row justify-content-center">
                                    {allExams?.map((exam) =>
                                        <div key={exam.id} className="lh-lg">
                                            <input
                                                onChange={(e) => handleCheck(e.target.checked, exam.id)}
                                                name={exam.name}
                                                className='align-middle'
                                                type='checkbox'
                                                checked={existingExams?.includes(exam.id) ?? undefined}
                                            />
                                            <label htmlFor={exam.name} className="me-5 ms-1">{exam.name}</label>
                                        </div>

                                    )}
                                </div>
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