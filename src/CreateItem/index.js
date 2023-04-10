const { randomUUID } = require("crypto");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);


exports.handler = async event => {
  try {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    const item = JSON.parse(event.body);

    // We generate a random ID to prevent collisions and distribute records in the
    // DynamoDB Table keyspace.
    if ("id" in item) {
      return {
        statusCode: 400,
        body: "'id' may not be provided in item attributes"
      };
    }

    // Generate a random UUID as the hash key ID for the item
    item.id = randomUUID();

    console.log(`Adding item with ID '${item.id}' to table '${process.env.ITEMS_TABLE_NAME}' with attributes: ${JSON.stringify(item, null, 2)}`);

    // We use a ConditionExpression to ensure we don't overwrite a record that
    // already exists for the same id. An error will be thrown if this happens
    // and we'll return a 500 error.
    const command = new PutCommand({
      TableName: process.env.ITEMS_TABLE_NAME,
      Item: item,
      ConditionExpression: "#idKey <> :idValue",
      ExpressionAttributeNames: {
        "#idKey": "id"
      },
      ExpressionAttributeValues: {
        ":idValue": item.id
      }
    });

    await ddbDocClient.send(command);

    console.log(`Successfully saved item '${item.id}'`);

    return {
      statusCode: 200
    };
  } catch (err) {
    console.error(`Failed to save item: ${err.message} (${err.constructor.name})`);

    return {
      statusCode: 500,
      body: "Internal Service Error"
    };
  }
};
