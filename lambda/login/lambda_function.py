from __future__ import print_function

import boto3
import json
import jwt
from passlib.apps import custom_app_context as pwd_context

print('Loading function')


def lambda_handler(event, context):
	print(json.dumps(event))
	username = event['username']
	password = event['password']

	if (username and password) :
		print('username=' + username)
		print('password=' + password)
		auth_userTable = boto3.resource('dynamodb').Table('auth_user')
		response = auth_userTable.get_item(Key={"username":username})
		print(response)
		if 'Item' in response.keys() :
			user = response['Item']
			print('user=' + json.dumps(user))
			# if (password == user['password']) :
			if (pwd_context.verify(password, user['password'])) :
				return getToken(user)
	return "invalid credintials"

def getToken(user) :
	payload = {"username": user['username']}
	encoded = jwt.encode(payload, user['secret'], algorithm='HS256')
	print(encoded)
	return {'auth_token': encoded}