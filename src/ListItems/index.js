const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async event => {
  try {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    console.log(`Listing items from table '${process.env.ITEMS_TABLE_NAME}'`);

    let ids = [];

    // Loop over all items. If there are more items after a request, the
    // response LastEvaluatedKey will have a non-null value that we can
    // pass in the next request to continue fetching more items.
    let lastEvaluatedKey;
    do {
      const command = new ScanCommand({
        TableName: process.env.ITEMS_TABLE_NAME,
        ProjectionExpression: "id",
        ExclusiveStartKey: lastEvaluatedKey
      });

      const response = await client.send(command);

      const additionalIds = response.Items.map(item => item.id);

      ids = ids.concat(additionalIds);

      lastEvaluatedKey = response.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    console.log(`Successfully scanned for list of IDs: ${JSON.stringify(ids, null, 2)}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ids
      })
    };
  } catch (err) {
    console.error(`Failed to list items: ${err.message} (${err.constructor.name})`);

    return {
      statusCode: 500,
      body: "Internal Service Error"
    };
  }
};
