from __future__ import print_function

import boto3
import json
import uuid

print('Loading function')

def lambda_handler(event, context):
	print("Received event: " + json.dumps(event, indent=2))
	message = event["message"]
	print(message)
	if (message["content"]) :
		id = str(uuid.uuid4())
		item = {'id':id, 'content':message["content"]}
		print(json.dumps(item))
		messageTable = boto3.resource('dynamodb').Table('cudas_message')
		print(messageTable.put_item(Item=item))
