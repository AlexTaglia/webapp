import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import List from "./components/Structure/List";
import Create from "./components/Structure/Create";
import Edit from "./components/Structure/Edit";
import CreateExam from "./components/Exams/CreateExam";
import ListExam from "./components/Exams/ListExam";
import EditExam from "./components/Exams/EditExam";


function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Row>
          <Col xs={6}>
            <Link to={"/"} className="navbar-brand text-white">
              home
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
    <Container className="mt-2">
      <Row>
        <Col>
          <Link className='btn btn-secondary mb-2 float-end' to={"/structure/create"}>
            Create structure
          </Link>
          <Link className='btn btn-secondary mb-2 float-end me-2' to={"/exam/create"}>
            Create exam
          </Link>
          <Link className='btn btn-secondary mb-2 float-end me-2' to={"/exam/list"}>
            Exams
          </Link>
          <Link className='btn btn-secondary mb-2 float-end me-2' to={"/"}>
            Structures
          </Link>
        </Col>
      </Row>

    </Container>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/structure/create" element={<Create />} />
            <Route path="/structure/edit/:id" element={<Edit />} />
            <Route path="/exam/create" element={<CreateExam />} />
            <Route path="/exam/list" element={<ListExam />} />
            <Route path="/exam/edit/:id" element={<EditExam />} />
            <Route path='/' element={<List />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
