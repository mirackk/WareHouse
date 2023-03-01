import axios from "axios";
const handleGetItems = async () => {
    try {
      const response = await axios.get(
        "https://crud-testtest.azurewebsites.net/api/get-item?code=8pl3Kg1LqASrOCfl-6LFJ1tRlH2mpC4fGKW3VSYQ66BFAzFuqwcmMA=="
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

handleGetItems()