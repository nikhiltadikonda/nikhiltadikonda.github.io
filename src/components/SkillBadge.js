import React from 'react';
import Badge from 'react-bootstrap/Badge';
import '../styles/styles.css'

function SkillBadge(props) {
    return (
                <Badge key={props.id} className = "skill-badge" pill bg="dark">
                    <img src={props.img} alt = {props.name} width = "23px" height = "23px" />{' '}
                    {props.name}
                </Badge>
        );
}

export default SkillBadge;