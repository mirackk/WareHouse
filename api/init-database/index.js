const {MongoClient} = require("mongodb")
const {v4:uuidv4} = require("uuid")

const url = "mongodb://mongo-taoyu:jRyAUGutPpPGYXsGT0DxvIEou4POVdVm6X3suBmFixBGJMomg7BLPkFlRepPQr6tlRiPEYjsMdfJACDbq1TSlQ==@mongo-taoyu.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongo-taoyu@"
const client = new MongoClient(url)

let mypeople = [
    {
        _id : uuidv4(),
	    Date : "03-01-2022",
	    WarehouseID : uuidv4(),
	    ShippingPO : uuidv4(),
	    ShipmentID : "1",
	    BoxesRcvd: "12"
    },
    {
        _id : uuidv4(),
	    Date : "03-02-2022",
	    WarehouseID : uuidv4(),
	    ShippingPO : uuidv4(),
	    ShipmentID : "2",
	    BoxesRcvd: "15"
    },
    {
        _id : uuidv4(),
	    Date : "03-03-2022",
	    WarehouseID : uuidv4(),
	    ShippingPO : uuidv4(),
	    ShipmentID : "2",
	    BoxesRcvd: "5"
    },
    {
        _id : uuidv4(),
	    Date : "03-04-2022",
	    WarehouseID : uuidv4(),
	    ShippingPO : uuidv4(),
	    ShipmentID : "3",
	    BoxesRcvd: "7"
    }
    
]


module.exports = async function (context, req) {

    await client.connect();
    const database = client.db("Warehouse")
    const collection = database.collection("Report")
    await collection.deleteMany({})
    await collection.insertMany(mypeople);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Init is done"
    };
}