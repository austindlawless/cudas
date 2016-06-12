from __future__ import print_function

import boto3
import json
import uuid
import datetime
from passlib.apps import custom_app_context as pwd_context

print('Loading function')

def lambda_handler(event, context) :
	print("Received event: " + json.dumps(event, indent=2))
	if (event["user"]) :
		user = event["user"]
		if (user["username"] and user["password"] and user["name"]) :
			username = user["username"]
			secret = str(uuid.uuid4())
			password = user["password"]
			hashedPassword = pwd_context.encrypt(password)
			signUpDate = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
			name = user["name"]
			item = {'username': username, 'secret':secret, 'password': hashedPassword, 'sign_up_date':signUpDate, 'name': name}
			messageTable = boto3.resource('dynamodb').Table('auth_user')
			return messageTable.put_item(Item=item)