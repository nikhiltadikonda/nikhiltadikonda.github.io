import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';
import profile from '../images/profile.png';

function Navigationbar() {

    return (
        <div>
            <Navbar bg="dark navbar-dark" expand="lg">
            <Container>
                <img alt="" src={profile} width="50" height="50" className="d-inline-block align-top navbar-image" />{' '}
                <Navbar.Brand href="#">Nikhil Tadikonda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="collapse navbar-collapse">
                    <Nav className="navbar-nav ml-auto">
                        <Nav.Link href="#languages">Languages</Nav.Link>
                        <Nav.Link href="#projects">Projects</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

export default Navigationbar;