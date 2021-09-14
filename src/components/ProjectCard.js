import React from 'react';
import {Button, ButtonGroup, Col, Card, DropdownButton, Dropdown} from 'react-bootstrap';

function ProjectCard(){

    return(
        <Col className="project-column" lg={4} md={6}>
            <Card> 
                <Card.Title>
                    <h3 class="project-box-title">Project Title</h3>
                </Card.Title>
                <Card.Body>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                <ButtonGroup size = "lg">
                    <Button variant = "primary">Open on Github</Button>
                    <DropdownButton as={ButtonGroup} id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">Star repository</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Fork Repository</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                    {/* <Button size = "lg" variant = "primary">View on Github</Button> */}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProjectCard;