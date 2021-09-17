import React from 'react';
import Container from 'react-bootstrap/Container';
import SkillCard from '../components/SkillCard';
import skill_data from '../helpers/skill_data';


function Skills() {
  return (
      <div>
        <section id="skills">
          <h2>My Technical Skills</h2>
          <Container>
              {skill_data.map(SkillCard)}
          </Container>
        </section>
      </div>
  )
}

export default Skills;