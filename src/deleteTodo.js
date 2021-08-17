const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const deleteTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName: "TodoTable",
      Key: { id },
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Methods": "DELETE", // Allow only DELETE request
    },
    body: JSON.stringify({
      msg: "Task Deleted",
    }),
  };
};

module.exports = {
  handler: middy(deleteTodo).use(httpJsonBodyParser()),
};
