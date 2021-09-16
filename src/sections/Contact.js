import React from 'react';
import Button from 'react-bootstrap/Button';
import profile from '../images/profile.png';
import ImageIcon from '../components/ImageIcon';

function Contact(){

    return(
        <div className = "contact">
            <section id="contact">
                <img className="profile-img-bottom" src={profile} width="90" height="90" alt="profile" />
                <h3 className="cta-heading">Looks Fascinating?</h3>
                <Button variant="dark" size="lg">Contact Me</Button>
            </section>
            <footer id="footer">
                <ImageIcon />
                <ImageIcon />
                <ImageIcon />
                <ImageIcon />
                <p className = "copyright-message">
                    © Copyright {new Date().getFullYear() === 2021 ? new Date().getFullYear() : "2021 - " + new Date().getFullYear()}, All Rights Reserved.
                </p>

            </footer>
        </div>
    );
}

export default Contact;