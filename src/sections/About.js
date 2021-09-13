import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SF3 from '../images/SF3.png'
import NavBar from './NavBar';

function About(){
    return(
        <div>
            <NavBar />
            <div className = "title">
                <Container>
                <Row>
                    <Col lg={6}>
                        <h1 class="sample">Hello, I'm Nikhil Tadikonda</h1>
                        <p className = "header-paragraph">I would like to be associated with a dynamic and progressive organization that will allow me to utilize my abilities and qualifications in the field to add value to the organization while providing me with opportunities for growth.</p>
                    </Col>
                    <Col lg={4} md={6}>
                        <img className="profile-img" src={SF3} width="300" height="250" alt="profile" />
                    </Col>
                </Row>
                </Container>
            </div>
        </div>
    );
}

export default About;