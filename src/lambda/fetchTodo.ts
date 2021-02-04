import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
};