import {
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ReturnValue,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";
import { Log, Webhook } from "./types";

const dynamodbClient = new DynamoDBClient({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
  },
});

export const updateOrCreateWebhook = async (data: {
  webhookUrl: string;
  area_name: string;
  email?: string;
  id?: string;
}) => {
  console.log(data);

  const command = new PutItemCommand({
    TableName: process.env.MY_DYNAMO_TABLE_NAME!,
    Item: marshall({
      id: uuid(),
      ...data,
    }),
    ReturnValues: ReturnValue.NONE,
  });

  await dynamodbClient.send(command);

  return { success: true };
};

export const getWebhooks = async (userEmail: string) => {
  const command = new QueryCommand({
    TableName: process.env.MY_DYNAMO_TABLE_NAME!,
    IndexName: "EmailIndex",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": { S: userEmail },
    },
  });

  const response = await dynamodbClient.send(command);

  return response.Items?.map((item) =>
    unmarshall(item)
  ) as unknown[] as Webhook[];
};

export const getWebhook = async (id: string) => {
  const command = new QueryCommand({
    TableName: process.env.MY_DYNAMO_TABLE_NAME!,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":id": { S: id },
    },
  });

  const response = await dynamodbClient.send(command);
  const item = response.Items?.[0] as any;

  return unmarshall(item) as Webhook;
};

export const removeWebhook = async (id: string) => {
  const command = new DeleteItemCommand({
    TableName: process.env.MY_DYNAMO_TABLE_NAME!,
    Key: {
      id: { S: id },
    },
    ReturnValues: ReturnValue.ALL_OLD,
  });

  const response = await dynamodbClient.send(command);

  return response.Attributes;
};

export const getLogs = async (webhookUrl: string) => {
  const command = new QueryCommand({
    TableName: process.env.MY_AWS_DYNAMO_LOG_TABLE_NAME!,
    IndexName: "WebhookIndex",
    KeyConditionExpression: "#webhookUrl = :webhookUrl",
    ExpressionAttributeNames: {
      "#webhookUrl": "webhookUrl",
    },
    ExpressionAttributeValues: {
      ":webhookUrl": { S: webhookUrl },
    },
  });

  const response = await dynamodbClient.send(command);

  return response.Items?.map((item) => unmarshall(item)) as unknown[] as Log[];
};
