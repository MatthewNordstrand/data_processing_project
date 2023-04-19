import { CfnCluster } from "aws-cdk-lib/aws-redshift";
import { Construct } from "constructs";

export default class DataWarehouse extends Construct {
  cluster: CfnCluster;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.cluster = new CfnCluster(this, "RedshiftCluster", {
      clusterType: "single-node",
      dbName: "dataProcessingWarehouse",
      masterUsername: "username",
      masterUserPassword: "password",
      nodeType: "dc2.large",
    });
  }

  public getCluster() {
    return this.cluster;
  }
}
