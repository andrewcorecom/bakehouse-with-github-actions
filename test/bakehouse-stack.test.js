import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { BakehouseStack, BakehouseSettings } from '../lib/bakehouse-stack.js'

test('Creates two DynamoDB tables', () => {
  const app = new cdk.App()

  const settings = new BakehouseSettings({
    permissionsBoundaryPolicyName: 'boundary',
    subDomain: 'test-bakehouse',
    domainName: 'cta-training.academy',
    certArn: 'arn:aws:acm:us-east-1:123456789012:certificate/test',
    env: {
      account: '123456789012',
      region: 'eu-west-2'
    },
    stackName: 'test-bakehouse',
    dbName: 'testdb',
    vpcName: 'test-vpc',
    sharedOriginRequestPolicyId: 'test-policy-id'
  })

  const stack = new BakehouseStack(app, 'TestStack', settings)
  const template = Template.fromStack(stack)

  template.resourceCountIs('AWS::DynamoDB::Table', 2)
})
