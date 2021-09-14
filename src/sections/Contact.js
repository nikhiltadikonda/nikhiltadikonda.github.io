import React from 'react';
import profile from '../images/profile.png';
import github from '../images/github.png';
import twitter from '../images/twitter.png';
import linkedin from '../images/linkedin.png';
import envelope from '../images/envelope.png';
import Button from 'react-bootstrap/Button';

function Contact(){

    return(
        <div className = "contact">
            <section id="contact">
                <img class="profile-img-bottom" src={profile} width="90" height="90" alt="profile" />
                <h3 class="cta-heading">Looks Fascinating?</h3>
                <Button variant="dark" size="lg" onClick="">Contact Me</Button>
            </section>
            <footer id="footer">
                <img  class="social-icons" src={github} width="50" height="50" alt="github" />
                <img class="social-icons" src={twitter} width="50" height="50" alt="twitter" />
                <img class="social-icons" src={linkedin} width="50" height="50" alt="linkedin" />
                <img class="social-icons" src={envelope} width="50" height="50" alt="envelope" />

                <p className = "copyright-message">
                    This project was made with React.js and React Bootstrap.<br />
                    © Copyright {new Date().getFullYear()} Nikhil Tadikonda. All Rights Reserved.
                </p>

            </footer>
            {/*  */}
        </div>
    );
}

export default Contact;