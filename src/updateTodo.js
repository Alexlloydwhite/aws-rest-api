const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const updateTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { completed } = event.body;
  const { id } = event.pathParameters

  await dynamodb.update({
    TableName: "TodoTable",
    Key: { id },
    UpdateExpression: 'set completed = :completed',
    ExpressionAttributeValues: {
        ':completed': completed
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Methods": "PUT" // Allow only PUT request 
    },
    body: JSON.stringify({
        msg: "Todo Updated"
    }),
  };
};

module.exports = {
  handler: middy(updateTodo).use(httpJsonBodyParser())
}
