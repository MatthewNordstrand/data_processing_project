import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Role } from "aws-cdk-lib/aws-iam";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface DataLambdaProps {
  lambdaRole: Role;
  dataTable: Table;
}

export default class DataLambda extends Construct {
  constructor(scope: Construct, id: string, props: DataLambdaProps) {
    super(scope, id);

    const lambda = new NodejsFunction(this, "Function", {
      entry: join(__dirname, "..", "lambda-functions", "FunctionDataLambda.ts"),
      handler: "handler",
      role: props.lambdaRole,
    });

    lambda.addEventSource(new DynamoEventSource(props.dataTable, { startingPosition: StartingPosition.LATEST }));
  }
}
