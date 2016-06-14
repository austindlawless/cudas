from __future__ import print_function

import boto3
from botocore.exceptions import ClientError
import uuid
import datetime
from passlib.apps import custom_app_context as pwd_context

print('Loading function')


def lambda_handler(event, context):
    if (event["user"]):
        user = event["user"]
        if (user["username"] and user["password"] and user["name"]):
            username = user["username"]
            secret = str(uuid.uuid4())
            password = user["password"]
            hashedPassword = pwd_context.encrypt(password)
            signUpDate = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
            name = user["name"]
            item = {'username': username, 'secret': secret, 'password': hashedPassword, 'sign_up_date': signUpDate, 'name': name}
            messageTable = boto3.resource('dynamodb').Table('auth_user')
            try:
                print("Attempting to insert user with username : " + username)
                messageTable.put_item(Item=item, ConditionExpression=boto3.dynamodb.conditions.Attr("username").not_exists())
            except ClientError as e:
                if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                    errorMessage = e.response['Error']['Message'] + " - that user already exists"
                    print(errorMessage)
                    return errorMessage
                else:
                    raise
