import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export default class DataIAM extends Construct {
  lambdaRole: Role;
  firehoseRole: Role;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.initLambdaRole();
    this.initFirehoseRole();
  }

  private initLambdaRole() {
    this.lambdaRole = new Role(this, "LambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      roleName: "MattDataLambda",
    });

    this.lambdaRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["lambda:*"],
      })
    );

    this.lambdaRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["cloudwatch:*"],
      })
    );

    this.lambdaRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["firehose:*"],
      })
    );
  }

  private initFirehoseRole() {
    this.firehoseRole = new Role(this, "FirehoseRole", {
      assumedBy: new ServicePrincipal("firehose.amazonaws.com"),
      roleName: "MattDataFirehose",
    });

    this.firehoseRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["lambda:*"],
      })
    );

    this.firehoseRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["s3:*"],
      })
    );

    this.firehoseRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["redshift:*"],
      })
    );

    this.firehoseRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["cloudwatch:*"],
      })
    );
  }

  public getRoles() {
    return { lambdaRole: this.lambdaRole, firehoseRole: this.firehoseRole };
  }
}
