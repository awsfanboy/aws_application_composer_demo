const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
  try {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    const id = event.pathParameters.id;

    console.log(`Deleting item with ID '${id}' from table '${process.env.ITEMS_TABLE_NAME}'`);

    // When deleting the record, return its values to us so we can see if the
    // record actually existed
    const command = new DeleteCommand({
      TableName: process.env.ITEMS_TABLE_NAME,
      Key: { id },
      ReturnValues: "ALL_OLD"
    });

    const response = await ddbDocClient.send(command);

    // If we deleted an item, Attributes will have its old attributes.
    // Otherwise, Attributes will be null.
    if (response.Attributes) {
      console.log(`Item '${id}' deleted`);

      return {
        statusCode: 200
      };
    } else {
      console.log(`Item '${id}' not found`);

      return {
        statusCode: 404,
        body: "Item not found"
      };
    }
  } catch (err) {
    console.error(`Failed to delete item: ${err.message} (${err.constructor.name})`);

    return {
      statusCode: 500,
      body: `Internal Service Error`
    };
  }
};
