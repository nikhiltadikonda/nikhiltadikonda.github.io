import React from 'react';
import Col from 'react-bootstrap/Col';
import envelope from '../images/envelope.png'
import '../styles/styles.css'

function LanguageCard() {
    return (
            <Col lg={4} className="language-box">
                <img className="language-icon" src={envelope} width="70" height="70" alt="language" />
                <h3 className = "language-description">Lorem ipsum</h3>
            </Col>
        );
}

export default LanguageCard;