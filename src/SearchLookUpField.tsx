// DropDownBox.tsx
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";

interface customGridProps {
  onRowClick?: GridEventListener<"rowClick">;
  rows: any;
  columns: any;
}

function GridControl(props: customGridProps) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowClick={props.onRowClick}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}

const Container_v = styled.div`
  position: relative;
  display: inline-block;
  width: 100%; /* Make the container take up 100% of the available width */
  max-width: 600px; /* Set a maximum width for the container */
`;

const TextField_v = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  cursor: pointer;

  &:focus {
    outline: 1px solid #ccc; /* Change the outline color on focus */
  }
`;

const DropDownIcon_v = styled.span`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
  color: rgba(128, 128, 128, 0.59);
  padding: 8px;
  border-radius: 4px;
`;

const Panel_v = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const SearchLookUpField: React.FC<SearchLookUpFieldProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      closePanel();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const [fieldDisplayValue, setFieldDisplayValue] = useState("");
  const [fieldValue, setFieldValue] = useState<any>(props.value);

  const handleRowClickEvent: GridEventListener<"rowClick"> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    console.log(params.row);
    setFieldDisplayValue(`${params.row[props.displayMember]}`);
    setFieldValue(`${params.row[props.valueMember]}`);
    setIsOpen(!isOpen);

    if (props.onChangeValue) {
      props.onChangeValue(`${params.row[props.valueMember]}`);
    }
  };

  useEffect(() => {
    // Check if props.value is not null
    if (props.value !== null) {
      // Find the corresponding row in props.rows
      const matchingRow = props.rows.find((row: any) => row.id === props.value);

      if (matchingRow) {
        // Assign first name to setFieldDisplayValue
        setFieldDisplayValue(`${matchingRow[props.displayMember]}`);
        // Assign props.value to setFieldValue
        setFieldValue(props.value);
      }
    }
  }, [props.value, props.rows, props.displayMember]);

  return (
    <Container_v ref={containerRef}>
      <TextField_v
        value={fieldDisplayValue}
        readOnly
        onClick={togglePanel}
        disabled={props.disabled}
        placeholder={props.placeHolder}
      />
      <DropDownIcon_v onClick={togglePanel}>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </DropDownIcon_v>
      <Panel_v isOpen={isOpen}>
        <Box>
          <GridControl
            onRowClick={handleRowClickEvent}
            rows={props.rows}
            columns={props.columns}
          />
        </Box>
      </Panel_v>
    </Container_v>
  );
};

interface SearchLookUpFieldProps {
  value?: any;
  disabled?: boolean;
  valueMember: string;
  displayMember: string;
  rows: any;
  columns: any;
  onChangeValue?: (newValue: any) => void;
  placeHolder?: string;
}

SearchLookUpField.defaultProps = {
  disabled: false, // Default value for the 'disabled' prop
};

export default SearchLookUpField;
