import React from 'react';
import './style.css';

const ListItem = (props) => (
    <li>
        <p>
            <div className="Score">{props.data.score}</div>
            <div className="Name">{props.data.name}</div>
        </p>
    </li>
)

export default ListItem;