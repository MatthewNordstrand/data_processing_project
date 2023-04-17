import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { MattProjectDataProcessingStack } from "../lib/matt_project_data_processing-stack";

let template: Template;
beforeAll(() => {
  const app = new cdk.App();
  const stack = new MattProjectDataProcessingStack(app, "TestStack");
  template = Template.fromStack(stack);
});

describe("Lambda Function Tests", () => {
  test("Role exists", () => {
    template.hasResourceProperties("AWS::IAM::Role", {
      RoleName: "MattDataLambda",
    });
  });
});

describe("Firehose Tests", () => {
  test("Role exists", () => {
    template.hasResourceProperties("AWS::IAM::Role", {
      RoleName: "MattDataFirehose",
    });
  });
});
