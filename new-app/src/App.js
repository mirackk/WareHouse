import React, { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { QueueServiceClient } from '@azure/storage-queue';
import { Buffer } from 'buffer';

// const connectionStr = process.env.REACT_APP_CONNECTIONSTR
const connectionStr = "BlobEndpoint=https://queuestoragetaoyu.blob.core.windows.net/;QueueEndpoint=https://queuestoragetaoyu.queue.core.windows.net/;FileEndpoint=https://queuestoragetaoyu.file.core.windows.net/;TableEndpoint=https://queuestoragetaoyu.table.core.windows.net/;SharedAccessSignature=sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-06-01T05:46:12Z&st=2023-04-17T21:46:12Z&spr=https&sig=0Uy2YwtB2r%2Fu62Ay%2FlBZzfXfEBWCKVHBS0TqA6oaqL4%3D"
const blobImg = "img";
const myqueue = "ocrqueue";

function App() {
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!file) return;

      console.log(file)
      
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionStr);
      const containerClient = blobServiceClient.getContainerClient(blobImg);

      try {
          //console.log("ok")
          const blockBlobClient = containerClient.getBlockBlobClient(file.name);
          await blockBlobClient.uploadBrowserData(file);

          //Add the message to the queue
          const queueServiceClient = QueueServiceClient.fromConnectionString(connectionStr);
          const queueClient = queueServiceClient.getQueueClient(myqueue);
          const message = file.name;
          const base64EncodedMessage = Buffer.from(message).toString('base64');

          await queueClient.sendMessage(base64EncodedMessage);
      } catch (error) {
          console.error('Error uploading image and adding message to the queue:', error);
      }
  };

  return (
      <div>
        <h1>Upload Images Test</h1>
          <form onSubmit={handleSubmit}>
              <input type='file' onChange={handleFileChange} />
              <button type='submit'>Upload</button>
          </form>
      </div>
  );
    
}

export default App;
