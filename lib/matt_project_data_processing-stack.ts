import * as cdk from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import DataDB from "./constructs/DataDB";
import DataIAM from "./constructs/DataIAM";
import DataLambda from "./constructs/DataLambda";

export class MattProjectDataProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dataIAM = new DataIAM(this, "DataIAM");

    const dataDB = new DataDB(this, "DynamoDB");

    new Bucket(this, "Bucket");

    new DataLambda(this, "Lambda", { lambdaRole: dataIAM.getRoles().lambdaRole, dataTable: dataDB.getTable() });
  }
}
