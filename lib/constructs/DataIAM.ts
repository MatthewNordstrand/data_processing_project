import { PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export default class DataIAM extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.initLambdaRole();
    this.initFirehoseRole();
  }

  private initLambdaRole() {
    const lambdaRole = new Role(this, "LambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      roleName: "MattDataLambda",
    });

    lambdaRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: ["lambda:*"],
      })
    );

    lambdaRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: ["cloudwatch:*"],
      })
    );

    lambdaRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: ["firehose:*"],
      })
    );
  }

  private initFirehoseRole() {
    const firehoseRole = new Role(this, "FirehoseRole", {
      assumedBy: new ServicePrincipal("firehose.amazonaws.com"),
      roleName: "MattDataFirehose",
    });

    firehoseRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: ["lambda:*"],
      })
    );

    firehoseRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: ["s3:*"],
      })
    );

    firehoseRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: ["redshift:*"],
      })
    );

    firehoseRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: ["cloudwatch:*"],
      })
    );
  }
}
