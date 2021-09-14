import React from 'react';
import {Alert, Container, Row, Col} from 'react-bootstrap';
import profile from '../images/profile.png'
import NavBar from './NavBar';

function About(){

    return(
        <div>
            <NavBar />
            <div className = "title">
                <Container>
                <Row>
                    <Col lg={6}>
                        {/* <h1 class="sample">Hello, I'm Nikhil Tadikonda</h1> */}
                        <Alert variant="info">
                        <Alert.Heading>Hey there, nice to see you here</Alert.Heading>
                        <p>
                            If you're still seeing this message, it means that this website is still under development. <br />So please have some patience while I get things ready for this website.
                        </p>
                        <hr />
                        <p className="mb-0">
                            If you have any doubts, feel free to contact me
                        </p> 
                    </Alert>
                    <Alert variant= "success">
                        We never understand how little we need in this world until we know the loss of it.
                    </Alert>
                        {/* <p className = "header-paragraph">
                            I would like to be associated with a dynamic and progressive organization that will allow me to utilize my abilities and qualifications in the field to add value to the organization while providing me with opportunities for growth.
                        </p> */}
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