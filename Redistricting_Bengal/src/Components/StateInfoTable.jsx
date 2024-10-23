import React from "react";
import { Table } from "react-bootstrap";

const StateInfoTable = ({ stateInfo }) => {
  return (
    <Table striped bordered hover className="table_contents_analysis">
      <thead>
        <tr>
          <td className="table_stateInfo_col1">Population</td>
          <td>{stateInfo.population}</td>
          <td className="table_stateInfo_col1">Voting Population</td>
          <td>{stateInfo.votePopulation}</td>
        </tr>
        <tr>
          <td className="table_stateInfo_col1">Total Seats</td>
          <td>{stateInfo.totalSeats}</td>
          <td className="table_stateInfo_col1">Party Splits</td>
          <td>
            Democrat: {stateInfo.democrat}; Republican: {stateInfo.republican}
          </td>
        </tr>
      </thead>
    </Table>
  );
};

export default StateInfoTable;
