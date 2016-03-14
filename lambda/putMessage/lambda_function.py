from __future__ import print_function

import boto3
import json
import jwt

print('Loading function')

def lambda_handler(event, context):
	print("Received event: " + json.dumps(event, indent=2))
	message = event["message"]
	id = event["id"]
	if (message and id) :
		item = {"id":id,"message":message}
		messageTable = boto3.resource('dynamodb').Table('cudas_message')
		print(messageTable.put_item(Item=item))
	
def test() :
	event = {
		"message" : "This website sucks.",
		"id":"1"
	}
	lambda_handler(event, None)