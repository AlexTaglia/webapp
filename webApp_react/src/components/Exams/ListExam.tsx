import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { Exam } from '../../types';

export default function ListExams() {

    const [products, setProducts] = useState([])
    const [searchFullName, setSearchFullName] = useState<string>('')
    const [currentPage, setCurrenPage] = useState(1)
    const [exams, setExams] = useState<Exam[]>([])


    useEffect(() => {
        fetchExams()
    }, [])

    const fetchExams = async () => {
        await axios.get(`http://localhost:8000/api/exams`).then(({ data }) => {
            console.log("exams", { data })
            setExams(data)
        })
    }


    const deleteProduct = async (id: any) => {

        await axios.delete(`http://localhost:8000/api/exams/${id}`).then(({ data }) => {
            fetchExams()
        }).catch(({ response: { data } }) => {

        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        exams.length > 0 && (
                                            exams.map((row: any, key) => (
                                                <tr key={key}>
                                                    <td>{row.name}</td>
                                                    <td>
                                                        <Link to={`/exam/edit/${row.id}`} className='btn btn-success me-2'>
                                                            Edit
                                                        </Link>
                                                        <Button variant="danger" onClick={() => deleteProduct(row.id)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}