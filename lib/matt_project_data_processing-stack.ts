import * as cdk from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import DataDB from "./constructs/DataDB";
import DataIAM from "./constructs/DataIAM";

export class MattProjectDataProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DataDB(this, "DynamoDB");

    new Bucket(this, "Bucket");

    new DataIAM(this, "DataIAM");
  }
}
