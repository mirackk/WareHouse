const {MongoClient} = require("mongodb")
const {v4:uuidv4} = require("uuid")

const url = "mongodb://mongo-taoyu:jRyAUGutPpPGYXsGT0DxvIEou4POVdVm6X3suBmFixBGJMomg7BLPkFlRepPQr6tlRiPEYjsMdfJACDbq1TSlQ==@mongo-taoyu.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongo-taoyu@"
const client = new MongoClient(url)

module.exports = async function (context, req) {
    context.log('hello world');

    await client.connect()
    const database = client.db("Warehouse")
    const collection = database.collection("Report")
    
    // get items in one date
    let reports = await collection.find({}).toArray()
	if (!reports){
      return context.res = {
          status:400,
          body: "Couldnt find that record"
      }
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: reports
    }
}