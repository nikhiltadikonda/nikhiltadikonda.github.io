import React from 'react';
import Button from 'react-bootstrap/Button';
import profile from '../images/profile.png';
import ImageIcon from '../components/ImageIcon';
import contact_data from '../helpers/contact_data';

function Contact(){

    return(
        <div className = "contact">
            <section id="contact">
                <img className="profile-img-bottom" src={profile} width="90" height="90" alt="profile" />
                <h3 className="cta-heading">Looks Fascinating?</h3>
                <Button variant="outline-dark" size="lg" onClick={() => window.open("mailto:nikhiltadikonda@gmail.com")}>Contact Me</Button>
            </section>
            <footer id="footer">
                {contact_data.map(ImageIcon)}
                <p className = "copyright-message">
                    © Copyright {new Date().getFullYear() === 2021 ? new Date().getFullYear() : "2021 - " + new Date().getFullYear()}, All Rights Reserved.
                </p>

            </footer>
        </div>
    );
}

export default Contact;