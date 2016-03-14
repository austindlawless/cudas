from __future__ import print_function

import boto3
import json
import jwt

print('Loading function')

def lambda_handler(event, context):
	username = event['username']
	password = event['password']
	
	if (username and password) :
		print('username=' + username)
		print('password=' + password)
		auth_userTable = boto3.resource('dynamodb').Table('auth_user')
		user = auth_userTable.get_item(Key={"username":username})['Item']
		print('user=' + json.dumps(user))
		if (password == user['password']) :
			return getToken(user)
		else :
			return get400()

def getToken(user) :
	payload = {"username": user['username']}
	encoded = jwt.encode(payload, user['secret'], algorithm='HS256')
	print(encoded)
	return {'auth_token': encoded}

def get400() :
	print('400')
	return {"response-code": 400}