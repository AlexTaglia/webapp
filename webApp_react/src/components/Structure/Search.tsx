import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default function Search() {

    const [structures, setStructures] = useState([])
    const [searchCity, setSearchCity] = useState<string>('')
    const [searchRegion, setSearchRegion] = useState<string>('')

    const get = async () => {
        await axios.get(`http://localhost:8000/api/search?city=${searchCity}&region=${searchRegion}`).then(({ data }) => {
            console.log("data", data)
            setStructures(data.data)
            // navigate("/")
        }).catch(({ err }) => {
            console.log("error", { err })
        })
    }


    useEffect(() => {
        get()
    }, [])

    useEffect(() => {
        if (searchCity || searchRegion)
            get()
    }, [searchCity, searchRegion])

    const showTable = useMemo(() => {
        console.log({structures})
        if (structures.length > 0) {
            return (
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
                            structures.map((row: any, key) => (
                                <tr key={key}>
                                    <td>{row.name}</td>
                                    <td>{row.city}</td>
                                    <td>{row.region}</td>
                                    <td>{row.phone}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )

        } else {
            return <p>No results</p>
        }

    }, [structures])


    return (
        <div className="container">
            <div className='row'>
                <div className='col-12'>
                    <div className='d-flex'>

                        <div className='d-flex flex-column me-4'>
                            <span style={{ fontSize: 14 }}>city</span>
                            <div className='d-flex align-items-center position-relative my-1'>
                                <input
                                    type='text'
                                    className='form-control form-control-solid w-250px ps-14'
                                    placeholder='Search city'
                                    value={searchCity}
                                    onChange={(e) => setSearchCity(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='d-flex flex-column me-4'>
                            <span style={{ fontSize: 14 }}>Region</span>
                            <div className='d-flex align-items-center position-relative my-1'>
                                <input
                                    type='text'
                                    className='form-control form-control-solid w-250px ps-14'
                                    placeholder='Search city'
                                    value={searchRegion}
                                    onChange={(e) => setSearchRegion(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            {showTable}
                            {/* <table className="table table-bordered mb-0 text-center">
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
                                        structures.length > 0 ? (
                                            structures.map((row: any, key) => (
                                                <tr key={key}>
                                                    <td>{row.name}</td>
                                                    <td>{row.city}</td>
                                                    <td>{row.region}</td>
                                                    <td>{row.phone}</td>

                                                </tr>
                                            ))
                                        ) : <p className='justify-content-center w-100'>No result</p>
                                    }
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}