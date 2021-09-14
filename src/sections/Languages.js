import React from 'react';
import Row from 'react-bootstrap/Row';
import LanguageCard from '../components/LanguageCard';


function Languages() {
  return (
      <div>
        <section id="languages">
          <h2 className = "language-title">Languages I'm perfect in: </h2>
          <Row>
            <LanguageCard />
            <LanguageCard />
            <LanguageCard />
          </Row>
        </section>
      </div>
  )
}

export default Languages;