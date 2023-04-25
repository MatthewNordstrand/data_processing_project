#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MattProjectDataProcessingStack } from "../lib/matt_project_data_processing-stack";

const app = new cdk.App();
new MattProjectDataProcessingStack(app, "MattProjectDataProcessingStack", {
  env: {
    account: "211512247116",
    region: "us-east-1",
  },
});
