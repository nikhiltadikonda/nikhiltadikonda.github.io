import React from 'react';
import {Row, Col} from 'react-bootstrap';
import python from '../images/python.png';
import java from '../images/java.png';
import javascript from '../images/javascript.png';


function Languages() {
  return (
      <div>
          <section id="languages">
      <h2>Languages I'm perfect in: </h2>
      <Row>
        <Col lg={4} className="language-box">

          <img class="language-icon" src={python} width="70" height="70" alt="python-icon" />
          <h3>Python</h3>
          
        </Col>
        <Col lg={4} className="language-box">
        
          <img class="language-icon" src={java} width="70" height="70" alt="java-icon" />
          <h3>Java</h3>
          
        </Col>
        <Col lg={4} className="language-box">
        
          <img class="language-icon" src={javascript} width="70" height="70" alt="javascript-icon"/>
          <h3>JavaScript</h3>
        
        </Col>
      </Row>
    </section>
      </div>
  )
}

export default Languages;