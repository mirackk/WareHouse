const { BlobServiceClient } = require('@azure/storage-blob');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const { MongoClient } = require('mongodb');

const connectionString = process.env.CONNECTIONSTR;
const blobContainerName = 'img';
const mongoUrl = 'mongodb://mongo-taoyu:blablabla';
const dbName = 'WareHouse'; // Replace with your database name
const collectionName = 'Products';

const visionClient = new ImageAnnotatorClient();
const mongoClient = new MongoClient(mongoUrl);

module.exports = async function (context, myQueueItem) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(blobContainerName);
    const blockBlobClient = containerClient.getBlockBlobClient(myQueueItem);
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    const imageBuffer = await downloadBlockBlobResponse.blobBody;

    const [result] = await visionClient.textDetection(imageBuffer);
    const detections = result.textAnnotations;
    const text = detections[0].description;

    // Extract product info using regex
    const regex = /^Product: (.+)\nTag line: (.+)\nPrice: (.+)\nSize: (.+)\nSKU: (.+)\nDescription: (.+)$/s;
    const match = text.match(regex);

    // Process text annotations to extract the required fields
    const productData = {
        name: match[1],
        tagline: match[2],
        price: match[3],
        size: match[4],
        sku: match[5],
        description: match[6],
    };

    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);

        await collection.insertOne(productData);
        context.log('Inserted product data into the database');
    } catch (error) {
        context.log('Error inserting product data into the database:', error);
    } finally {
        await mongoClient.close();
    }
};
