import React from 'react';
import logo from '../images/sslogo2.png'

class PopUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceKeys: Object.keys(this.props.choices),
            choiceButtons: []
        };
    }

    componentDidMount() {
        let buttonArray = [];
        for (let i = 0; i < this.state.choiceKeys.length - 1; i++) {
            let button = 
                <button id={this.state.choiceKeys[i] + "Btn"} type="button" 
                        className="mode-page-btn action-dialog dialog-primary-btn"
                        onClick={this.props.choices[this.state.choiceKeys[i]]}>
                    {this.state.choiceKeys[i]}
                </button>;
            buttonArray.push(button);
        }
        let button = 
        <button id={this.state.choiceKeys[this.state.choiceKeys[this.state.choiceKeys.length - 1]] + "Btn"} type="button" 
                        className="mode-page-btn action-dialog dialog-cancel-btn"
                        onClick={this.props.choices[this.state.choiceKeys[this.state.choiceKeys.length - 1]]}>
                    {this.state.choiceKeys[this.state.choiceKeys.length - 1]}
        </button>;
        buttonArray.push(button);
        this.setState({choiceButtons: buttonArray});
    }

    render() {
        return(
            <div className="dialog-backdropStyle">
                <div id={this.props.id + "Dialog"} 
                        className="mode-page action-dialog" role="dialog" 
                        aria-modal="true" aria-labelledby={this.props.id + "Header"}
                        tabindex="0">
                    <button id={this.props.id + "Close"} type="button" 
                            className="btn-close dialog-close-btn" aria-label="Close"
                            onClick={this.props.choices[this.state.choiceKeys[this.state.choiceKeys.length - 1]]}>
                    </button>
                    <h1 id={this.props.id + "Header"} className="mode-page-header">{this.props.id}</h1>
                    <p className="mode-page-content">
                        {this.props.text}
                    </p>
                    <img className="mode-page-icon" src={logo} 
                            alt="SpeedScore logo"/>
                    <div className="mode-page-btn-container">
                        {this.state.choiceButtons}
                    </div>
                </div>
            </div>
        );
    }
}

PopUpModal.propTypes = {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    choices: React.PropTypes.object.isRequired
};

export default PopUpModal;