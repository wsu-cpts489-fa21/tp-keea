import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class BadgeModal extends React.Component { 
    renderTable = () => {
        const table = [];
        for (let r = 0; r < this.props.badges.length; ++r) {
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
}

export default BadgeModal