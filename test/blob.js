const { BlobServiceClient } = require("@azure/storage-blob");
const STORAGE_CONNECTION_STRING = "BlobEndpoint=https://queuestoragetaoyu.blob.core.windows.net/;QueueEndpoint=https://queuestoragetaoyu.queue.core.windows.net/;FileEndpoint=https://queuestoragetaoyu.file.core.windows.net/;TableEndpoint=https://queuestoragetaoyu.table.core.windows.net/;SharedAccessSignature=sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-06-01T05:46:12Z&st=2023-04-17T21:46:12Z&spr=https&sig=0Uy2YwtB2r%2Fu62Ay%2FlBZzfXfEBWCKVHBS0TqA6oaqL4%3D"
  // Note - Account connection string can only be used in node.

async function main() {
    const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient("img");
    // let i =1;
    // for await (const container of blobServiceClient.listContainers()) {
    //     console.log(`Container ${i++}: ${container.name}`);
    // }
    const blockBlobClient = containerClient.getBlockBlobClient("te2.png");
    await blockBlobClient.uploadFile("te.png");
}

main()