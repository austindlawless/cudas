from __future__ import print_function

import boto3
import json
import uuid
import time
import jwt

print('Loading function')


def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    message = event["data"]["message"]
    auth_token = event["auth_token"]
    try:
        payload = jwt.decode(auth_token, verify=False)
    except jwt.InvalidTokenError:
        raise Exception('Unauthorized')

    username = payload["username"]
    print('username: ' + username)

    if (message["content"]):
        id = str(uuid.uuid4())
        date = int(time.time())
        item = {'id': id, 'content': message["content"], 'date': date, 'username': username}
        messageTable = boto3.resource('dynamodb').Table('cudas_message')
        return messageTable.put_item(Item=item)
