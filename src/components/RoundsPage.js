import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundsMode  from './RoundsMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js'

class RoundsPage extends React.Component {
    constructor(props) {
            super(props);
            this.state = {mode: RoundsMode.ROUNDSTABLE,
                          deleteId: -1,
                          editId: -1};        
    }

    initiateEditRound = (val) => {
        this.setState({editId: val,
                       mode: RoundsMode.EDITROUND}, 
                       this.props.toggleModalOpen);
    }
    
    initiateDeleteRound = (val) => {
        this.setState({deleteId: val},
        () => alert("Confirm delete goes here!"));
    }

    render() {
        switch (this.state.mode) {
        case RoundsMode.ROUNDSTABLE: 
            return (
                <>
                    <RoundsTable rounds={this.props.rounds}
                                initiateDeleteRound={this.initiateDeleteRound}
                                deleteRound={this.props.deleteRound} 
                                deleteId={this.state.deleteId}
                                initiateEditRound= {this.initiateEditRound}
                                updateRound= {this.props.updateRound}
                                setMode={this.setMode} 
                                toggleModalOpen={this.props.toggleModalOpen}
                                menuOpen={this.props.menuOpen} /> 
                    <FloatingButton
                        icon="calendar"
                        label={"Log Round"}
                        menuOpen={this.props.menuOpen}
                        action={()=>this.setState({mode: RoundsMode.LOGROUND},
                                    this.props.toggleModalOpen)} />
            </>
            );
        case RoundsMode.LOGROUND:
            return (
            <RoundForm mode={this.state.mode}
                    roundData={null}
                    saveRound={this.props.addRound}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case RoundsMode.EDITROUND:
            let i;
            for (i = 0; i < this.props.rounds.length; ++i) {
                if (this.props.rounds[i].roundNum === this.state.editId) {
                    break;
                }
            }
            return (
            <RoundForm mode={this.state.mode}
                roundData={this.props.rounds[i]}
                saveRound={this.props.updateRound}
                setMode={this.setMode}
                toggleModalOpen={this.props.toggleModalOpen} />
            );
        }
    }  

}

export default RoundsPage;