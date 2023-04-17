import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import DataIAM from "./constructs/DataIAM";

export class MattProjectDataProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DataIAM(this, "DataIAM");
  }
}
