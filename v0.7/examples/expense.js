"use strict";

import FixedDataTable from 'fixed-data-table';
import React from 'react';

const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col, ...props}) => (
	  <Cell {...props}>
	    {data[rowIndex][col]}
	  </Cell>
	);

// class HeaderCell extends React.Component {
// 	_onFilterChange(data, cellDataKey, event) {
// 	    if (!event.target.value) {
// 	      this.setState({
// 	        filteredDataList: data,
// 	      });
// 	    }
// 	    var filterBy = event.target.value.toString().toLowerCase();
// 	    var size = data.length;
// 	    var filteredList = [];
// 	    for (var index = 0; index < size; index++) {
// 	      var v = data[index][cellDataKey];
// 	      if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
// 	        filteredList.push(data[index]);
// 	      }
// 	    }
// 	    this.setState({
// 	      filteredDataList: filteredList,
// 	    });
// 	  }

// 	render() { 	
// 		const {data, col, ...props} = this.props;
// 	  return (
// 		<Cell {...props}>
// 			{col}
// 			<input style={{width:90+'%'}} onChange={this._onFilterChange.bind(this, data, col)}/>
// 		</Cell>
// 		)
// 	}
// }


	

class Expense extends React.Component {
 
  constructor(props) {
    super(props);
    this.rows = 
          [{"dbKey":1,"notes":"note 1","date":"2017-02-21"},
           {"dbKey":2,"notes":"ntoe 2","date":"2017-03-22"},
           {"dbKey":3,"notes":"note 3","date":"2017-05-24"}
           ];
  
    this.state = {
      filteredDataList: this.rows,
      sortBy: 'dbKey',
      sortDir: null
    }


  }


	_onFilterChange(col, event) {
	    if (!event.target.value) {
	      this.setState({
	        filteredDataList: this.rows,
	      });
	    }
	    console.log("value in filter change: " + event.target.value)
	    console.log("col in filter change: " + col)
	    var filterBy = event.target.value.toString().toLowerCase();
	    var size = this.rows.length;
	    var filteredList = [];
	    for (var index = 0; index < size; index++) {
	      var v = this.rows[index][col];
	      if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
	        filteredList.push(this.rows[index]);
	      }
	    }
	    this.setState({
	      filteredDataList: filteredList,
	    });
	  }

	//_headerCell = ({col, ...props}) => {
	_headerCell(col) {
		//let { col, ...props } = this.props;
		console.log("col in headercell: " + col)
	//_headerCell(col) {		
		  return (
			<div>
				{col}
				<input style={{width:90+'%'}} onChange={this._onFilterChange.bind(this, col)}/>
			</div>
			)
		}


  render() {
    var {filteredDataList} = this.state;
    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by dbKey"
        />
        <br />
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.length}
          headerHeight={100}
          width={1000}
          height={1000}
          {...this.props}>          
          <Column            
            cell={<TextCell data={filteredDataList} col="dbKey" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>Date</Cell>}
            cell={<TextCell data={filteredDataList} col="date" />}
            fixed={true}
            width={100}
          />
          <Column
			header={this._headerCell.bind(this,"notes")}
            //header={<Cell>Notes</Cell>}
            cell={<TextCell data={filteredDataList} col="notes" />}
            width={100}
          />         
        </Table>
      </div>
    );
  }
}

//module.exports = FilterExample;
export default Expense;