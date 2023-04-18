import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { MattProjectDataProcessingStack } from "../lib/matt_project_data_processing-stack";

let template: Template;
beforeAll(() => {
  const app = new cdk.App();
  const stack = new MattProjectDataProcessingStack(app, "TestStack");
  template = Template.fromStack(stack);
});

describe("Lambda Function Tests", () => {
  test("Role exists with correct attributes", () => {
    template.hasResourceProperties("AWS::IAM::Role", {
      RoleName: "MattDataLambda",
    });
  });
});

describe("Firehose Tests", () => {
  test("Role exists with correct attributes", () => {
    template.hasResourceProperties("AWS::IAM::Role", {
      RoleName: "MattDataFirehose",
    });
  });
});

describe("S3 Bucket Tests", () => {
  test("Bucket exists with correct attributes", () => {
    template.hasResourceProperties("AWS::S3::Bucket", {});
  });
});

describe("DynamoDB Table Tests", () => {
  test("Table exists with correct attributes", () => {
    template.hasResourceProperties("AWS::DynamoDB::Table", {
      KinesisStreamSpecification: Match.anyValue(),
    });
  });
});

describe("Kinesis Stream Tests", () => {
  test("Stream exists with correct attributes", () => {
    template.hasResourceProperties("AWS::Kinesis::Stream", {
      ShardCount: 1,
    });
  });
});
