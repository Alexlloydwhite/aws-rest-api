const AWS = require("aws-sdk");

const updateTodo = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { completed } = JSON.parse(event.body);
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
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            "Access-Control-Allow-Methods": "GET" // Allow only GET request 
        },
        body: JSON.stringify({
            msg: "Todo Updated"
        }),
    };
};

module.exports = {
    handler: updateTodo
}