const { BlobServiceClient } = require('@azure/storage-blob');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const { MongoClient } = require('mongodb');

// for blob
const connectionString = process.env.connectionStr
//const connectionString=process.env.connectionStr
const blobContainerName = 'img';
// for db
const mongoUrl = "mongodb://mongo-taoyu:jRyAUGutPpPGYXsGT0DxvIEou4POVdVm6X3suBmFixBGJMomg7BLPkFlRepPQr6tlRiPEYjsMdfJACDbq1TSlQ==@mongo-taoyu.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongo-taoyu@";
const mongoClient = new MongoClient(mongoUrl);
const dbName = 'Warehouse'; // Replace with your database name
const collectionName = 'Products';
// for vision
const tmpkey = process.env.tmpkey

async function getClient() {
    const client = new ImageAnnotatorClient({
      credentials: tmpkey
    });
    // console.log(tmpkey)
    return client;
  }


  async function extractProductInfo(image) {
    try {
      // await getClient();
      const client = await getClient();
      const [result] = await client.textDetection(image);
      const detections = result.textAnnotations;
      const text = detections[0].description;
  
      // Extract product info using regex
      const regex = /^Product: (.+)\nTag line: (.+)\nPrice: (.+)\nSize: (.+)\nSKU: (.+)\nDescription: (.+)$/s;
      const match = text.match(regex);
  
      if (!match) {
        throw new Error('Failed to extract product info');
      }
  
      const productInfo = {
        Product: match[1],
        Tagline: match[2],
        Price: match[3],
        Size: match[4],
        Sku: match[5],
        Description: match[6],
      };
  
      return productInfo;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

// Helper function to convert a stream to a buffer
function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  }


module.exports = async function (context, myQueueItem) {
    context.log(myQueueItem)
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(blobContainerName);
    const blockBlobClient = containerClient.getBlockBlobClient(myQueueItem);
    const downloadResponse = await blockBlobClient.download(0);
    const imageBuffer = await streamToBuffer(downloadResponse.readableStreamBody);

    
    const productInfo = await extractProductInfo(imageBuffer);
    

    try {
        // Connect to MongoDB
        await mongoClient.connect();
        context.log('Connected to MongoDB');

        // Select the database and collection
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);

        // Insert the product info into the MongoDB collection
        const result = await collection.insertOne(productInfo);
        context.log(`Product info inserted with _id: ${result.insertedId}`);

        // Close the MongoDB connection
        await mongoClient.close();
        context.log('Inserted product data into the database');
    } catch (error) {
        context.log('Error inserting product data into the database:', error);
    } finally {
        await mongoClient.close();
    }

};


// "GOOGLE_APPLICATION_CREDENTIALS":{