import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export default class DataLambda extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new NodejsFunction(this, "Function", {
      entry: join(__dirname, "..", "lambda-functions", "FunctionDataLambda.ts"),
      handler: "handler",
    });
  }
}
