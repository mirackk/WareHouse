const {MongoClient} = require("mongodb")
const {v4:uuidv4} = require("uuid")

const url = "mongodb://mongo-taoyu:jRyAUGutPpPGYXsGT0DxvIEou4POVdVm6X3suBmFixBGJMomg7BLPkFlRepPQr6tlRiPEYjsMdfJACDbq1TSlQ==@mongo-taoyu.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongo-taoyu@"
const client = new MongoClient(url)

module.exports = async function (context, req) {
    const data = req.body;
    const newData = data.map(item => ({
        _id: uuidv4(),
        Date: item.Date,
        WarehouseID: item.WarehouseID,
        ShippingPO: item.ShippingPO,
        ShipmentID: item.ShipmentID,
        BoxesRcvd: item.BoxesRcvd
    }));
    await client.connect();
    const database = client.db("Warehouse");
    const collection = database.collection("Report");
    const result = await collection.insertMany(newData);
	if (!result){
      return context.res = {
          status:400,
          body: "Couldnt insert"
      }
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    }
}