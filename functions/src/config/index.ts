import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const credential = new DefaultAzureCredential();
export const siteId = process.env['SITE_ID'];
export const emailSender = process.env['email_sender'];
export const databaseName = process.env['DB_NAME'];

// Configuration data for graph
export const graphConfig = async () => {
  // destructure process.env
  const { isLocal, kvUrl } = process.env;

  const config = {
    tenant_id: '701edd3e-c7a8-4789-b1ce-8a243620d68f',
    grant_type: 'client_credentials',
    scope: 'https://graph.microsoft.com/.default',
  }

  // Local config (not running on Azure)
  if (isLocal === "true") {
    return {
      ...config,
      client_id: process.env['client_id'],
      devSecret: process.env['devSecret'],
    }
  }

  // Config running on Azure
  else {
    if (!kvUrl){
      return
    }
    const kvClient = new SecretClient(kvUrl, credential);

    const client_id = await kvClient.getSecret('ar-cdk-graph-clientid');
    const devSecret = await kvClient.getSecret('ar-cdk-graph-secret');

    return {
      ...config,
      client_id: client_id.value,
      devSecret: devSecret.value,
    }
  }
}

export const mongoConfig = async () => {
  // destructure process.env
  const { isLocal=false, kvUrl } = process.env;
  
  // Local config (not running on Azure)
  if (isLocal === "true") {
    return {
      connectionString: "mongodb://127.0.0.1:41148",
    }
  }

  // Config running on Azure
  else {
    if (!kvUrl){
      return
    }

    const kvClient = new SecretClient(kvUrl, credential);
    const connectionStr = await kvClient.getSecret("cosmosdbconnectionstring");
    return {
      connectionString: connectionStr.value,
    }
  }
}
