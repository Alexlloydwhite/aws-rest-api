const AWS = require("aws-sdk");

const fetchTodos = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todo;

  try {
    const results = await dynamodb.scan({ TableName: "TodoTable" }).promise();
    todo = results.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Methods": "GET" // Allow only GET request 
    },
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodos
}