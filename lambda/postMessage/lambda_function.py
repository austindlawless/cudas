from __future__ import print_function

import boto3
import json
import uuid
import datetime

print('Loading function')

def lambda_handler(event, context):
	print("Received event: " + json.dumps(event, indent=2))
	message = event["message"]
	if (message["content"]) :
		id = str(uuid.uuid4())
		item = {'id':id, 'content':message["content"], 'date':'{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())}
		messageTable = boto3.resource('dynamodb').Table('cudas_message')
		return messageTable.put_item(Item=item)
