import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default function List() {

    const [products, setProducts] = useState([])
    const [searchFullName, setSearchFullName] = useState<string>('')
    const [currentPage, setCurrenPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [nextPageUrl, setNextPageUrl] = useState("")
    const [prevPageUrl, setPrevPageUrl] = useState("")


    useEffect(() => {
        fetchStructure()
    }, [currentPage])

    const fetchStructure = async () => {
        await axios.get(`http://localhost:8000/api/structures?page=${currentPage}`).then(({ data }) => {
            setProducts(data.data)
            setTotalPages(data.last_page)
        })
    }


    const deleteProduct = async (id: any) => {
        await axios.delete(`http://localhost:8000/api/structures/${id}`).then(({ data }) => {
            fetchStructure()
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
                                        <th>City</th>
                                        <th>Region</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.length > 0 && (
                                            products.map((row: any, key) => (
                                                <tr key={key}>
                                                    <td>{row.name}</td>
                                                    <td>{row.city}</td>
                                                    <td>{row.region}</td>
                                                    <td>{row.phone}</td>


                                                    <td>
                                                        <Link to={`/structure/edit/${row.id}`} className='btn btn-success me-2'>
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
            <div className="row mt-5">
                <div className="col-12 justify-content-end">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end">
                            <li className="page-item">
                                <button 
                                disabled={currentPage === 1}
                                className="page-link" 
                                onClick={()=>setCurrenPage(currentPage-1)} 
                                aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Prev</span>
                                </button>
                            </li>
                            <li className="page-item">
                                <button 
                                disabled
                                className="page-link">
                                    <span className="sr-only">{currentPage}</span>
                                </button>
                            </li>
                            <li className="page-item">
                                <button 
                                disabled
                                className="page-link">
                                    <span className="sr-only">of</span>
                                </button>
                            </li>
                            <li className="page-item">
                                <button 
                                disabled
                                className="page-link">
                                    <span className="sr-only">{totalPages}</span>
                                </button>
                            </li>
                            <li className="page-item">
                                <button 
                                disabled={currentPage === totalPages}
                                className="page-link" 
                                onClick={()=>setCurrenPage(currentPage+1)} 
                                aria-label="Next">
                                    <span className="sr-only">Next</span>
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}