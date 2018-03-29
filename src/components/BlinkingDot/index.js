import React from 'react';
import './style.css';

class BlinkingDot extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="pulsating-circle" />
        );
    }

}

export default BlinkingDot;

