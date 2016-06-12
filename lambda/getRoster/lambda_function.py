from __future__ import print_function

import boto3

def lambda_handler(event, context):
    dynamo = boto3.resource('dynamodb').Table('cudas_roster')
    return dynamo.scan()