import React from 'react';
import RoundsMode  from './RoundsMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js'
import { faCalendar  } from '@fortawesome/free-solid-svg-icons'


class RoundsPage extends React.Component {
    constructor(props) {
            super(props);
            this.state = {mode: RoundsMode.ROUNDSTABLE,
                          rounds:[],
                          roundCount: 0,
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
    

    addRound = (newRound) => {
        const newRounds = [...this.state.rounds];
        const newRoundCount = this.state.roundCount + 1;
        newRound.roundNum = newRoundCount;
        newRounds.push(newRound);
        this.setState({rounds: newRounds, 
                        roundCount: newRoundCount,
                        mode: RoundsMode.ROUNDSTABLE},this.props.toggleModalOpen);
    }

    updateRound = (newRound) => {
        const newRounds = [...this.state.rounds];
        let r;
        for (r = 0; r < newRounds.length; ++r) {
            if (newRounds[r].roundNum === this.state.editId) {
                break;
            }
        }
        newRounds[r] = newRound;
        this.setState({rounds: newRounds, 
                        editId: -1,
                        mode: RoundsMode.ROUNDSTABLE},this.props.toggleModalOpen);
    }

    deleteRound = () => {
        const newRounds = [...this.state.rounds];
        let r;
        for (r = 0; r < newRounds.length; ++r) {
            if (newRounds[r].roundNum === this.state.deleteId) {
                break;
            }
        }
        delete newRounds[r];
        this.setState({rounds: newRounds, deleteId: -1},this.props.toggleModal);
    }

    render() {
        switch (this.state.mode) {
        case RoundsMode.ROUNDSTABLE: 
            return (
                <>
                    <RoundsTable rounds={this.state.rounds}
                                initiateDeleteRound={this.initiateDeleteRound}
                                deleteId={this.state.deleteId}
                                initiateEditRound= {this.initiateEditRound}
                                setMode={this.setMode} 
                                deleteRound={this.deleteRound} 
                                toggleModalOpen={this.props.toggleModalOpen}
                                menuOpen={this.props.menuOpen} /> 
                    <FloatingButton
                        icon={faCalendar}
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
                    saveRound={this.addRound}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case RoundsMode.EDITROUND:
            let i;
            for (i = 0; i < this.state.rounds.length; ++i) {
                if (this.state.rounds[i].roundNum === this.state.editId) {
                    break;
                }
            }
            return (
            <RoundForm mode={this.state.mode}
                roundData={this.state.rounds[i]}
                saveRound={this.updateRound}
                setMode={this.setMode}
                toggleModalOpen={this.props.toggleModalOpen} />
            );
        }
    }  

}

export default RoundsPage;