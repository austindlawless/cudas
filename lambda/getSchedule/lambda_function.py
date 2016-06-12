from __future__ import print_function

import boto3
import json

def lambda_handler(event, context):
    dynamo = boto3.resource('dynamodb').Table('cudas_schedule')
    response = dynamo.get_item(Key={'season':'20161'})
    print(response)
    return response