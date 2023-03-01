
import React, { useEffect, useState, useMemo } from "react";
//import { useTable } from 'react-table';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

const columns = [
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'warehouseID', headerName: 'Warehouse ID', width: 350 },
  { field: 'shippingPO', headerName: 'Shipping PO', width: 350 },
  { field: 'shipmentID', headerName: 'Shipment ID', width: 150 },
  {
    field: 'boxesRcvd',
    headerName: 'Boxes Received',
    type: 'number',
    width: 150,
  },
];

export var rows = [{ date:'0', warehouseID: '0', shippingPO:'0',shipmentID:'0', boxesRcvd: 0}].map(row => ({ id: uuidv4(), ...row }));

export const updateRows = (newRows) =>{
  console.log(newRows)
  rows = newRows.map(row => ({ id: uuidv4(), ...row }));
}

export default function DataTable() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        autoGenerateRowId
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>

  );
}


