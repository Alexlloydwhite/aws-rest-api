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
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "https://www.example.com",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodos
}