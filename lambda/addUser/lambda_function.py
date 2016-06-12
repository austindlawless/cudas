from __future__ import print_function

import boto3
import json
import jwt

print('Loading function')

def lambda_handler(event, context):
	if (authorized(event['auth_token'])) :
		print('authorized')
	else :
		return {'response-code': 400}
		
	
def authorized(encoded) :
	unverified_payload = jwt.decode(encoded, verify=False)
	unverified_username = unverified_payload['username']
	auth_userTable = boto3.resource('dynamodb').Table('auth_user')
	secret = auth_userTable.get_item(Key={"username":unverified_username})['Item']['secret']
	print('unverifided_username=' + unverified_username)
	payload = jwt.decode(encoded, secret, algorithms=['HS256'])
	username = payload['username']
	print('username=' + username)
	if (username == unverified_username) :
		return True
	else :
		return False