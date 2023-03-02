const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

export const te=async()=>{
    // Initialize a DefaultAzureCredential instance with the Managed Identity credentials
    const credential = new DefaultAzureCredential();

    // Create a SecretClient instance for the Key Vault
    const vaultName = "apikeyTaoyu";
    const url = "https://apikeytaoyu.vault.azure.net/";
    const client = new SecretClient(url, credential);

    // Get the Azure Function host key secret from the Key Vault
    const secretName = "crudkey";
    const secret = await client.getSecret(secretName);

    // Extract the host key value from the secret
    const hostKey = secret.value;
    console.log(hostKey)
}


