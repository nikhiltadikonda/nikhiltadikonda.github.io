import React from 'react';
import Container from 'react-bootstrap/Container';
import SkillBadge from '../components/SkillBadge';
import skill_data from '../helpers/skill_data';


function Skills() {
  return (
      <div>
        <section id="skills">
          <h2>My Technical Skills</h2>
          <Container>
              {skill_data.map(SkillBadge)}
          </Container>
        </section>
        <hr />
      </div>
  )
}

export default Skills;