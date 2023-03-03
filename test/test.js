const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const te=async()=>{
    const { SecretClient } = require("@azure/keyvault-secrets");

    const vaultName = "apikeytaoyu";
    const url = `https://${vaultName}.vault.azure.net/`;

    const credential = {
        clientId: "6303338a-40ee-498b-801c-425126e175e3",
        clientSecret: "5Ar8Q~xmwqg09Ukn7aHKFuugJqehEFSyj59tRaJM",
        tenantId: "d57d32cc-c121-488f-b07b-dfe705680c71"
    };

    const client = new SecretClient(url, credential);
    const secretName = "mytest";

    client.getSecret(secretName).then((secret) => {
        console.log(secret.value);
    });
}

te()
// // tmp = process.env["te"]
// // console.log(tmp)

// require('dotenv').config()
// console.log(process.env.test) 

// import React, { useState ,useEffect} from "react";
// import axios from "axios";
// import { Select, Typography,MenuItem } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
// import DataTable ,{updateRows} from "./component/table";

// // require('dotenv').config()
// // console.log(process.env.test) 


// // import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
// // import { SecretClient } from "@azure/keyvault-secrets";
// //import te from "./test"

// function App() {
//   const [houseId, setHouseId] = useState("");
//   const [date, setDate] = useState("");
//   const [items, setItems] = useState([]);

//   const [tableRows,setTableRows] = useState([]);

//   const [key,setKey] = useState("");

//   const vaultKey = process.env.REACT_APP_KEY

//   const handleHouseIdChange = (event) => {
//     setHouseId(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//   };

//   const handleGetItems = async () => {
//     try {
//       console.log(process.env)
//       const tmp = "8pl3Kg1LqASrOCfl-6LFJ1tRlH2mpC4fGKW3VSYQ66BFAzFuqwcmMA=="
//       const response = await axios.get(
//         "https://crud-testtest.azurewebsites.net/api/get-item",
//         {headers:{"x-functions-key":process.env.REACT_APP_KEY}}
//       );
      
//       console.log(response)
//       setItems(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// //   const fetchReports = async () => {
// //     const url = "https://crud-testtest.azurewebsites.net/api/get-item?code=8pl3Kg1LqASrOCfl-6LFJ1tRlH2mpC4fGKW3VSYQ66BFAzFuqwcmMA=="
// //     const res = await fetch(url, {
// //       method: "GET",
// //     });
// //     const json = await res.json();
// //     // put in state
// //     setItems(json);
// //     console.log(json);
// //   };

//   const handleGetItemsByDate = async () => {
//     try {
//       const response = await axios.get(
//         `https://<your-azure-function-app-name>.azurewebsites.net/api/get-item-by-date?date=${date}`
//       );
//       setItems(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

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

//   const updateTable = async()=>{
//     var tmpRows =[];
//     for(var item of items){
//       var row = {date:'', warehouseID: '', shippingPO:'',shipmentID:'', boxesRcvd: 0};
//       row.date = item.Date
//       row.warehouseID = item.WarehouseID
//       row.shippingPO = item.ShippingPO
//       row.shipmentID = item.ShipmentID
//       row.boxesRcvd = item.BoxesRcvd
//       //console.log(row);
//       tmpRows.push(row);
//       //setTableRows(rows => [...rows,row]);
//       //console.log(grade.studentId+":new row added  ");
//     }
//     //console.log(tmpRows);
//     setTableRows(tmpRows);
//   };

// //   const getFunctionKey = async()=>{
// //     // Initialize a DefaultAzureCredential instance with the Managed Identity credentials
// //     const credential = new DefaultAzureCredential();
// //     // const credential = new InteractiveBrowserCredential({
// //     //     tenantId: "d57d32cc-c121-488f-b07b-dfe705680c71",
// //     //     redirectUri: window.location.origin,
// //     //   });

// //     // Create a SecretClient instance for the Key Vault
// //     const vaultName = "apikeyTaoyu";
// //     const myUrl = "https://apikeytaoyu.vault.azure.net/";
// //     const client = new SecretClient(myUrl, credential);

// //     // Get the Azure Function host key secret from the Key Vault
// //     const secretName = "crudkey";
// //     const secret = await client.getSecret(secretName);

// //     // Extract the host key value from the secret
// //     const hostKey = secret.value;
// //     console.log(hostKey)
// //     setKey(hostKey)
// //   }

// //   useEffect(()=>{
// //     console.log("hi")
// //     getFunctionKey()
// //     //console.log(key)
// //   },[]);

//   useEffect(()=>{
//     updateTable()
//   },[items]);

//   useEffect(()=>{
//     updateRows(tableRows);
//     //console.log(tableRows);
//   },[tableRows]);

//   // useEffect(()=>{
//   //   handleGetItems()
//   //   //console.log(grades);
//   // },[]);

//   return (
//     <div>
//       <h1>Warehouse by TaoyuChen</h1>
//       <div>
//         <button onClick={handleGetItems}>Get All Reports</button>
//       </div>
//       <div>
//         <label>House ID:</label>
//         <input type="text" value={houseId} onChange={handleHouseIdChange} />
//         <button onClick={handleGetItems}>Get Items</button>
//       </div>
//       <div>
//         <label>Date:</label>
//         <input type="text" value={date} onChange={handleDateChange} />
//         <button onClick={handleGetItemsByDate}>Get Items by Date</button>
//       </div>
//       <div>
//         <button onClick={handleInsertData}>Insert Data</button>
//       </div>
//       <ul>
//         {/* {items.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))} */}
//       </ul>
//       <div>
//         {/*get datatable*/}
//         <DataTable/>
//       </div>
      
//     </div>
    
//   );
// }

// export default App;
