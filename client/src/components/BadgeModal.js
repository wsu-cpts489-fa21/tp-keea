import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class BadgeModal extends React.Component { 
    renderTable = () => {
        console.log("Badges Table Render method called.");
        const table = [];
        for (let r = 0; r < this.props.badges.length; ++r) {
            console.log(`Adding badge with name ${this.props.badges[r].name}`)
            table.push(
                <tr key={r}>
                    <td>{this.props.badges[r].icon}</td>
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

    render() {
        return (
            <>
                <div id="badgesModal" className="centered">
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