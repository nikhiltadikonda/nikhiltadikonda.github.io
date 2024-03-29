import React from 'react';
import {Button, Col, Card} from 'react-bootstrap';

function ProjectCard(props){

    var url = `${process.env.REACT_APP_SOCIALIFY_URL}/${props.owner.login}/${props.name}/${process.env.REACT_APP_SOCIALIFY_URL_PARAM}`;

    return(
        <Col key = {props.id} className="project-column" lg={4} md={6}>
            <Card className = "project-card-color project-card repo-card">
                <Card.Img variant="top" src={url} /> 
                <Card.Body>
                    <Button variant = "light" onClick={() => window.open(props.svn_url)}>View Project on Github</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProjectCard;