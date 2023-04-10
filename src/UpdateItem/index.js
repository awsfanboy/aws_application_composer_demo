const { DynamoDBClient, ConditionalCheckFailedException } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
  try {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    const item = JSON.parse(event.body);

    if ("id" in item) {
      return {
        statusCode: 400,
        body: "'id' may not be provided in item attributes"
      };
    }

    item.id = event.pathParameters.id;

    console.log(`Updating item with ID '${item.id}' in table '${process.env.ITEMS_TABLE_NAME}'`);

    // Use a ConditionExpression to overwrite a record only if there is
    // already a record (i.e. there already is a record with an id attribute,
    // because all records must have a hash key attribute)
    const command = new PutCommand({
      TableName: process.env.ITEMS_TABLE_NAME,
      Item: item,
      ConditionExpression: "attribute_exists(#idKey)",
      ExpressionAttributeNames: {
        "#idKey": "id"
      }
    });

    await ddbDocClient.send(command);

    console.log(`Successfully updated item '${item.id}'`);

    return {
      statusCode: 200
    };
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException) {
      console.log("Item not found");

      return {
        statusCode: 404,
        body: "Item not found"
      };
    }

    console.error(`Failed to update item: ${err.message} (${err.constructor.name})`);

    return {
      statusCode: 500,
      body: "Internal Service Error"
    };
  }
};
