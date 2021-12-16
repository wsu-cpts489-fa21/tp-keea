import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ReviewTable extends React.Component {

  renderTable = () => {
    const table = [];
    for (let r = 0; r < this.props.reviews.length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.props.reviews[r].reviewerName}</td>
          <td>{this.props.reviews[r].dateOfReview}</td>
          <td>{this.props.reviews[r].reviewFriendliness}</td>
        </tr> 
      );
    }
    return table;
  }

    render() {
      return(
        <div id="reviewsModeTab" className="mode-page" role="tabpanel"
            aria-label="Courses Tab" tabIndex="0">
        <h1 className="mode-page-header">Reviewss</h1>
        <table id="reviewsTable" className="table table-hover caption-top">
          <caption id="reviewsTableCaption" aria-live="polite">
            {"Table displaying " + this.props.reviews.length  + " course reviews" + 
              (this.props.reviews.length !== 1 ? "s" : "")}
          </caption>
          <thead className="table-light">
            <tr>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by name">
                  <FontAwesomeIcon icon="sort" /> 
                </button>Name
            </th>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by date">
                  <FontAwesomeIcon icon="sort" /> 
                </button>Date
            </th>
            <th scope="col" className="cell-align-middle">
              Friendliness
            </th>
            </tr>
          </thead>
          <tbody>
            {this.props.reviews === null || this.props.reviews.length === 0 ? 
              <tr>
                <td colSpan="5" scope="rowgroup"><i>No reviews logged</i></td>
              </tr> : this.renderTable()
            }
          </tbody>
        </table>        
      </div>
      );
    }   
}

export default ReviewTable;