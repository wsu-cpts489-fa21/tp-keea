import React from 'react';
import RoundsMode from './RoundsMode.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class BadgeModal extends React.Component { 
    renderTable = () => {
        console.log("Badges Table Render method called.");
        const table = [];
        for (let r = 0; r < this.props.badges.length; ++r) {
            console.log(`Adding badge with name ${this.props.badges[r].name}`)
            let iconClass = `dialog-${this.props.badges[r]}Icon`
            table.push(
                <tr key={r}>
                    <td><img src={this.props.badges[r].icon} alt={this.props.badges[r].name + " Badge"}/></td>
                    <td>{this.props.badges[r].name}</td>
                    <td>{this.props.badges[r].description}</td>
                    <td>
                        {
                            this.props.badges[r].obtained ? <FontAwesomeIcon icon={"check"} className="dialog-checkIcon"/> :
                            <FontAwesomeIcon icon={"times"} className="dialog-xIcon"/>
                        }
                    </td>
                </tr> 
            );
        }
        return table;
    }

    renderList = () => {
        console.log("Badges render list has been called");
        const badges = [];
        for (let r = 0; r < this.props.badges.length; r++) {
            console.log(`Adding badge to list with name ${this.props.badges[r].name}`);
            let badgeElementId = `badge-element-id-${r}`;
            badges.push(
                <div id={badgeElementId} className="badge-element">
                    <div className="badge-icon">
                        {this.props.badges[r].icon}
                    </div>
                    <h1 classname="badge-name">
                        {this.props.badges[r].name}
                    </h1>
                    <p className="badge-description">
                        {this.props.badges[r].description}
                    </p>
                    <div className="badge-obtained">
                        {
                            this.props.badges[r].obtained ? <FontAwesomeIcon icon={"check"} className="dialog-checkIcon"/> :
                            <FontAwesomeIcon icon={"times"} className="dialog-xIcon"/> 
                        }
                    </div>
                </div>
            );
        }

        return badges;
    }

    render() {
        return (
            <>
                <div id="badgesModal" className="centered mode-page">
                    <button type="button" className="mode-page-btn action-dialog dialog-cancel-btn" onClick={() => this.props.setMode(RoundsMode.ROUNDSTABLE)}>
                        Back to Rounds
                    </button>
                    <table id="badgesTable" className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="cell-align-middle">Icon</th>
                                <th scope="col" className="cell-align-middle">Name</th>
                                <th scope="col" className="cell-align-middle">Description</th>
                                <th scope="col" className="cell-align-middle">Obtained</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default BadgeModal