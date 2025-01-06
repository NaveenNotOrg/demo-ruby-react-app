import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material"; // Import Material-UI TextField component
import { Table, TableRowClickEventDetail } from '@ui5/webcomponents-react';
import {
    SuggestionItem,
    SuggestionItemGroup,
    SuggestionListItem,
    ListItemStandard,
    Button,
    ListItemCustom,
    ListItemGroup,
    Icon,
  } from '@ui5/webcomponents-react';
import { Input } from '@ui5/webcomponents-react';
import {
    TableRow,
    TableCell,
    TableHeaderRow,
    TableHeaderCell,
    TableGrowing,
    TableSelection,
    TableVirtualizer,
  } from '@ui5/webcomponents-react';
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const GET_REQ_API_URL = BASE_URL + "/api/v1/purchase_requisitions";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "MMMM dd, yyyy HH:mm:ss"); // Example format: 'December 22, 2024 09:37:11'
};

function getAllRequisitions() {
  return axios.get(GET_REQ_API_URL).then((res) => res.data);
}

function PurchaseRequisitions() {
  const [requisitions, setRequisitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getAllRequisitions().then((reqs) => {
      if (mounted) {
        setRequisitions(reqs);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredRequisitions = requisitions.filter((req) =>
    Object.values(req)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Purchase Requisitions</h1>
        <Button
          design="Default"
          icon="employee"
          onClick={() => navigate("/pr/new")}
        >
          New Purchase Requisition
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        {/* <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        <Input
          icon={<Icon name="employee" />}
          onChange={function Ki(){}}
          onClose={function Ki(){}}
          onInput={function Ki(){}}
          onOpen={function Ki(){}}
          onSelect={function Ki(){}}
          onSelectionChange={function Ki(){}}
          type="Text"
          valueState="None"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <Table
        headerRow={<TableHeaderRow sticky><TableHeaderCell minWidth="200px" width="200px"><span>ID</span></TableHeaderCell>
        <TableHeaderCell minWidth="200px"><span>Type</span></TableHeaderCell>
        <TableHeaderCell minWidth="200px"><span>Description</span></TableHeaderCell>
        <TableHeaderCell maxWidth="200px" minWidth="100px"><span>Created At</span></TableHeaderCell>
        <TableHeaderCell minWidth="200px"><span>Update At</span></TableHeaderCell>
        </TableHeaderRow>}
        onRowClick={(oEvent ) => { const row = oEvent.detail.row;
          const cells = row.children;
          const cellValues = Array.from(cells).map(cell => cell.textContent);
      
          console.log('Cell Values:', cellValues);
          // Access a specific cell value, for instance the ID (first cell)
          console.log('ID:', cellValues[0]);
          navigate(`/pr/${cellValues[0]}`)
        }}
        >
          
            {filteredRequisitions.map((row) => (
              <TableRow interactive = "true" onRowClick= {(oEvent) => { debugger; }}>
                <TableCell><span>{row.id}</span></TableCell>
                <TableCell><span>{row.pr_type}{" "}
                  {row.pr_type_desc && (
                    <span className="text-sm text-gray-500">({row.pr_type_desc})</span>
                  )}</span></TableCell>
                <TableCell><span>{row.description}</span></TableCell>
                <TableCell><span>{formatDate(row.created_at)}</span></TableCell>
                <TableCell><span>{formatDate(row.updated_at)}</span></TableCell>
              </TableRow>
            ))}
          </Table>
      </div>
    </div>
  );
}

export default PurchaseRequisitions;
