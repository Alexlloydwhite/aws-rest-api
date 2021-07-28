const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const addTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  console.log(`IN addTodo - ID: ${id}`);

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false
  }

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Methods": "POST" // Allow only POST request 
    },
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser())
}
