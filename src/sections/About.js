import React from 'react';
import {Alert, Container, Row, Col} from 'react-bootstrap';
import profile from '../images/profile.png'
import NavBar from '../components/NavBar';
import QuoteCard from '../components/QuoteCard';

function About(){

    return(
        <div>
            <NavBar />
            <div className = "title">
                <Container>
                <Row>
                    <Col lg={6}>
                        <Alert variant="dark">
                            <Alert.Heading>Hello, I'm Nikhil Tadikonda</Alert.Heading>
                            <hr />
                            <p>
                                I would like to be associated with a dynamic and progressive organization that will allow me to utilize my abilities and qualifications in the field to add value to the organization while providing me with opportunities for growth.
                            </p>
                    </Alert>
                    <QuoteCard />
                    </Col>
                    <Col lg={4} md={6}>
                        <img className="profile-img" src={profile} width="300" height="250" alt="profile" />
                    </Col>
                </Row>
                </Container>
            </div>
        </div>
    );
}

export default About;