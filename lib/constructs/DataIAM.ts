import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export default class DataIAM extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.initLambdaRole();
    this.initFirehoseRole();
  }

  private initLambdaRole() {
    new Role(this, "LambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      roleName: "MattDataLambda",
    });
  }

  private initFirehoseRole() {
    new Role(this, "FirehoseRole", {
      assumedBy: new ServicePrincipal("firehose.amazonaws.com"),
      roleName: "MattDataFirehose",
    });
  }
}
