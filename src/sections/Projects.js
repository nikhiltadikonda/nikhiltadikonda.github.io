import React from 'react';
import Row from 'react-bootstrap/Row';
import ProjectCard from '../components/ProjectCard'

function Projects(){
    return(
        <div className = "projects">
            <section id="projects">

            <h1 id="project-title">My Projects</h1>
            <p id="project-subtitle">Well, I made some useful projects</p>

            <Row>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </Row>
            </section>
        </div>
    );
}

export default Projects;