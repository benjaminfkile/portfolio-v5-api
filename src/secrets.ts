import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"
import { IAPISecrets } from "./interfaces"

// Fetch and parse secrets from AWS
export async function getAppSecrets(): Promise<IAPISecrets> {
  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION
  })

  const command = new GetSecretValueCommand({
    SecretId: process.env.AWS_SECRET_ARN
  })

  const response = await client.send(command)

  if (!response.SecretString) {
    throw new Error("SecretString is empty in Secrets Manager response")
  }

  return JSON.parse(response.SecretString) as IAPISecrets
}
