const AWS = require('aws-sdk')

const secretName = 'prod/new-ocpp'
const client = new AWS.SecretsManager({ region: 'ap-south-1' })

const loadSecrets = async () => {
  try {
    const data = await client.getSecretValue({ SecretId: secretName }).promise()

    if (data.SecretString) {
      const secrets = JSON.parse(data.SecretString)

      for (const [key, value] of Object.entries(secrets)) {
        process.env[key] = value
        
      }
    } else {
      console.log('Secrets not found.')
    }
  } catch (error) {
    throw new Error(`Error retrieving secrets: ${error.message}`)
  }
}

module.exports = loadSecrets
