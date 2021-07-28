const AWS = require("aws-sdk");

const fetchTodo = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters

    let todo;

    try {
        const result = await dynamodb.get({
            TableName: "TodoTable",
            Key: { id }
        }).promise();
        todo = result.Item;
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
    handler: fetchTodo
}