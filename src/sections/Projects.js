import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import ProjectCard from '../components/ProjectCard';

function Projects(){

    const [repoList, showrepoList] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_GITHUB_API_URL}`).then((response) => {
            showrepoList(response.data);
        });
    }, []);

    if (!repoList) return null;

    return(
        <div className = "projects">
            <section id="projects">

            <h1 id="project-title">My Projects</h1>
            <p id="project-subtitle">Well, I made some projects</p>

            <Row>
                {repoList.map(ProjectCard)}
            </Row>
            </section>
        </div>
    );
}

export default Projects;