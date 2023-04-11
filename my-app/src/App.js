import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Select, Typography,MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DataTable ,{updateRows} from "./component/table";

// require('dotenv').config()
// console.log(process.env.test) 
// import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
// import { SecretClient } from "@azure/keyvault-secrets";
//import te from "./test"

function App() {
  const [houseId, setHouseId] = useState("");
  const [date, setDate] = useState("");
  const [shipmentID,setShipmentID] = useState("")
  const [items, setItems] = useState([]);

  const [tableRows,setTableRows] = useState([]);

  const [key,setKey] = useState("");

  const vaultKey = process.env.REACT_APP_KEY

  const apiUrl = "https://crud-testtest.azurewebsites.net/api/"

  const handleHouseIdChange = (event) => {
    setHouseId(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleShipmentIDChange = (event) => {
    setShipmentID(event.target.value)
  }

  const handleGetItems = async () => {
    try {
      //console.log(process.env)
      //const tmp = "8pl3Kg1LqASrOCfl-6LFJ1tRlH2mpC4fGKW3VSYQ66BFAzFuqwcmMA=="
      const response = await axios.get(
        apiUrl+"reports",
        {headers:{"x-functions-key":process.env.REACT_APP_KEY}}
      );
      
      //console.log(response)
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
//   const fetchReports = async () => {
//     const url = "https://crud-testtest.azurewebsites.net/api/get-item?code=8pl3Kg1LqASrOCfl-6LFJ1tRlH2mpC4fGKW3VSYQ66BFAzFuqwcmMA=="
//     const res = await fetch(url, {
//       method: "GET",
//     });
//     const json = await res.json();
//     // put in state
//     setItems(json);
//     console.log(json);
//   };

  const handleGetItemsByDate = async () => {
    try {
        console.log(date)
      const response = await axios.get(
        apiUrl+"reportByDate/"+date+"?",
        {   
            headers:{"x-functions-key":process.env.REACT_APP_KEY},
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetItemsByHouseID = async () => {
    try {
      const response = await axios.get(
        apiUrl+"reportByHouseID/"+houseId+"?",
        {   
            headers:{"x-functions-key":process.env.REACT_APP_KEY},
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetItemsByShipmentID = async () => {
    try {

      const response = await axios.get(
        apiUrl+"reportByShipmentID/"+shipmentID+"?",
        {   
            headers:{"x-functions-key":process.env.REACT_APP_KEY},
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

//   const handleInsertData = async () => {
//     try {
//       const response = await axios.post(
//         `https://<your-azure-function-app-name>.azurewebsites.net/api/insert-data`,
//         {
//           houseId: houseId,
//           date: date,
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const updateTable = async()=>{
    var tmpRows =[];
    for(var item of items){
      var row = {date:'', warehouseID: '', shippingPO:'',shipmentID:'', boxesRcvd: 0};
      row.date = item.Date
      row.warehouseID = item.WarehouseID
      row.shippingPO = item.ShippingPO
      row.shipmentID = item.ShipmentID
      row.boxesRcvd = item.BoxesRcvd
      //console.log(row);
      tmpRows.push(row);
      //setTableRows(rows => [...rows,row]);
      //console.log(grade.studentId+":new row added  ");
    }
    //console.log(tmpRows);
    setTableRows(tmpRows);
  };

  useEffect(()=>{
    updateTable()
  },[items]);

  useEffect(()=>{
    updateRows(tableRows);
    //console.log(tableRows);
  },[tableRows]);

  // useEffect(()=>{
  //   handleGetItems()
  //   //console.log(grades);
  // },[]);

  return (
    <div>
      <h1>Warehouse by TaoyuChen Ver2.0</h1>
      <div>
        <button onClick={handleGetItems}>Get All Reports</button>
      </div>
      <div>
        <label>Date:</label>
        <input type="text" value={date} onChange={handleDateChange} />
        <button onClick={handleGetItemsByDate}>Get Reports</button>
      </div>
      <div>
        <label>Warehouse ID:</label>
        <input type="text" value={houseId} onChange={handleHouseIdChange} />
        <button onClick={handleGetItemsByHouseID}>Get Reports</button>
      </div>
      <div>
        <label>Shipment ID:</label>
        <input type="text" value={shipmentID} onChange={handleShipmentIDChange} />
        <button onClick={handleGetItemsByShipmentID}>Get Reports</button>
      </div>
      <ul>
        {/* {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))} */}
      </ul>
      <div>
        {/*get datatable*/}
        <DataTable/>
      </div>
      
    </div>
    
  );
}

export default App;