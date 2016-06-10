from __future__ import print_function

import boto3
import json

print('Loading function')

def lambda_handler(event, context):
	print("Received event: " + json.dumps(event, indent=2))
	message = event["message"]
	print(message)
	if (message["content"]) :
		# item = {"id":id,"message":message}
		# messageTable = boto3.resource('dynamodb').Table('cudas_message')
		# print(messageTable.put_item(Item=item))
		print(message["content"])