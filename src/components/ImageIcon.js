import React from 'react';

function ImageIcon(props) {
    return (

            <img key={props.id} className="social-icons" src={props.img} width="30" height="30" alt="github" />
    );
}

export default ImageIcon;