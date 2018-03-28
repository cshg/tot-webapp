import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

class BlinkingDot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBlinking: false,
        };
        this.toggleOn = this.toggleOn.bind(this)
        this.toggleOff = this.toggleOff.bind(this)
    }

    componentDidMount() {
        if (this.props.frequency) {
            var intervalId = setInterval(this.toggleOn, (1000 / this.props.frequency));
            this.setState({intervalId: intervalId});
        }
    }

    componentWillUnmount() {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }

    toggleOn() {
        this.setState({
            isBlinking: true,
        });
        setTimeout(this.toggleOff, 100);
    }

    toggleOff() {
        this.setState({
            isBlinking: false,
        });
    }

    render() {
        const circle = this.state.isBlinking ? (
            <div className="circle" />
        ) : (
            <div className="circle bg-white" />
        );

        return (
            circle
        );
    }

}

BlinkingDot.propTypes = {
    frequency: PropTypes.number
};

export default BlinkingDot;

