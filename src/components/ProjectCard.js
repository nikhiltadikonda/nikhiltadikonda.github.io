import React from 'react';
import {Button, Col, Card} from 'react-bootstrap';

function ProjectCard(props){

    return(
        <Col key = {props.id} className="project-column" lg={4} md={6}>
            <Card className = "project-card repo-card"> 
                <Card.Title>
                    <h3 className="project-box-title">{props.name}</h3>
                </Card.Title>
                <hr/>   
                <Card.Body>
                    <p>
                        {props.description == null ? "No description available" : (props.description.length > 100 ? props.description.substring(0, 100) + "..." : props.description)}
                    </p>
                    <Button variant = "primary">Open on Github</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProjectCard;