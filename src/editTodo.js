const AWS = require("aws-sdk");

const editTodo = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { editedTodo } = JSON.parse(event.body);
    const { id } = event.pathParameters

    await dynamodb
        .update({
            TableName: "TodoTable",
            Key: { id },
            UpdateExpression: 'set todo = :editedTodo',
            ExpressionAttributeValues: {
                ':editedTodo': editedTodo
            },
            ReturnValues: "ALL_NEW"
        })
        .promise();

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            "Access-Control-Allow-Methods": "PUT" // Allow only PUT request 
        },
        body: JSON.stringify({
            msg: "Todo Updated"
        }),
    };
};

module.exports = {
    handler: editTodo
}