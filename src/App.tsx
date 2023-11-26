import React, { useState } from "react";
import DropDownBox from "./SearchLookUpField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchLookUpField from "./SearchLookUpField";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

function App() {
  const rows = [
    { id: 10, partCode: "P010", desc: "Dummy Description 1" },
    { id: 11, partCode: "P011", desc: "Dummy Description 2" },
    { id: 12, partCode: "P012", desc: "Dummy Description 3" },
    { id: 13, partCode: "P013", desc: "Dummy Description 4" },
    { id: 14, partCode: "P014", desc: "Dummy Description 5" },
    { id: 15, partCode: "P015", desc: "Dummy Description 6" },
    { id: 16, partCode: "P016", desc: "Dummy Description 7" },
    { id: 17, partCode: "P017", desc: "Dummy Description 8" },
    { id: 18, partCode: "P018", desc: "Dummy Description 9" },
  ];
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "partCode",
      headerName: "Part Code",
      width: 150,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 150,
    },
  ];

  const [value, setvalue] = useState(null);

  const handleSearchFieldChange = (newValue: any) => {
    setvalue(newValue);
  };

  return (
    <div>
      <CssBaseline />

      <Container maxWidth="sm">
        <h1>PartId : {value ? value : "-"}</h1>

        <SearchLookUpField
          valueMember="id"
          displayMember="partCode"
          rows={rows}
          columns={columns}
          value={value}
          onChangeValue={handleSearchFieldChange}
        />
      </Container>
    </div>
  );
}

export default App;
