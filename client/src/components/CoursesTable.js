import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CoursesTable extends React.Component {

  openCourseOnGoogle = (val) => {
    
  }

  openCourseOnGoogle = (val) => {
    
  }

  renderTable = () => {
    const table = [];
    for (let r = 0; r < this.props.courses.length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.props.courses[r].name}</td>
          <td>{this.props.courses[r].averageOverall}</td>
          <td>{Number(this.props.courses[r].roundCount)}</td>
          <td><button onClick={this.props.menuOpen ? null : () => 
              this.openCourseOnGoogle(r)}>
              <FontAwesomeIcon icon="map"/>
          </button></td>
          <td><button onClick={this.props.menuOpen ? null : () => 
              this.openCourseContactInfo(r)}>
              <FontAwesomeIcon icon="info"/>
          </button></td>
          <td><button onClick={this.props.menuOpen ? null : () => 
                  this.props.initiateEditCourse(r)}>
                <FontAwesomeIcon icon="eye"/> 
                <FontAwesomeIcon icon="edit"/> 
              </button></td>
          <td><button onClick={this.props.menuOpen ? null : 
            () => this.props.initiateDeleteCourse(r)}>
                <FontAwesomeIcon icon="trash"/>
              </button></td>
        </tr> 
      );
    }
    return table;
  }

    render() {
      return(
        <div id="coursesModeTab" className="mode-page" role="tabpanel"
            aria-label="Courses Tab" tabIndex="0">
        <h1 className="mode-page-header">Courses</h1>
        <table id="coursesTable" className="table table-hover caption-top">
          <caption id="coursesTableCaption" aria-live="polite">
            {"Table displaying " + this.props.courses.length  + " speedgolf course" + 
              (this.props.courses.length !== 1 ? "s" : "")}
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
                        aria-label="Sort ascending by rating">
                  <FontAwesomeIcon icon="sort" /> 
                </button>Rating
            </th>
            <th scope="col" className="cell-align-middle">
              Location
            </th>
            <th scope="col" className="cell-align-middle">
              Contact
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
            {this.props.courses === null || this.props.courses.length === 0 ? 
              <tr>
                <td colSpan="5" scope="rowgroup"><i>No courses logged</i></td>
              </tr> : this.renderTable()
            }
          </tbody>
        </table>        
      </div>
      );
    }   
}

export default CoursesTable;