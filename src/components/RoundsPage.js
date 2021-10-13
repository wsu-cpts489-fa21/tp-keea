import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort,  } from '@fortawesome/free-solid-svg-icons'

class RoundsPage extends React.Component {

    render() {
        return(
        <div id="roundsModeTab" className="mode-page" role="tabpanel"
           aria-label="Rounds Tab" tabIndex="0">
        <h1 className="mode-page-header">Rounds</h1>
        <table id="roundsTable" className="table table-hover caption-top">
          <caption id="roundsTableCaption" aria-live="polite">Rounds Table</caption>
          <thead className="table-light">
            <tr>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by date">
                  <FontAwesomeIcon icon={faSort} /> 
                </button>Date
            </th>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by course">
                  <FontAwesomeIcon icon={faSort} /> 
                </button>Course
            </th>
            <th scope="col" role="columnheader"
                className="sortable-header cell-align-middle"
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by score">
                  <FontAwesomeIcon icon={faSort} />
                </button>Score
            </th>
            <th scope="col" className="cell-align-middle">
              View/Edit...
            </th>
            <th scope="col" className="cell-align-middle">
              Delete
            </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td colSpan="5" scope="rowgroup"><i>No rounds added yet</i></td>
            </tr> 
          </tbody>
        </table>        
      </div>
        );
    }   
}

export default RoundsPage;