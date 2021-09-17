import React from 'react';
import Badge from 'react-bootstrap/Badge';
import '../styles/styles.css'

function SkillCard(props) {
    return (
                <Badge key={props.id} className = "skill-badge" pill bg="light" text="dark">
                    {/* <img src={props.img} width = "30px" height = "30px" />{' '} */}
                    {props.name}
                </Badge>
        );
}

export default SkillCard;