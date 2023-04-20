import { CfnCluster } from "aws-cdk-lib/aws-redshift";
import { Construct } from "constructs";

export default class DataWarehouse extends Construct {
  cluster: CfnCluster;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.cluster = new CfnCluster(this, "RedshiftCluster", {
      clusterType: "single-node",
      dbName: "warehouse",
      masterUsername: "username",
      masterUserPassword: "Password1",
      nodeType: "dc2.large",
      publiclyAccessible: true,
    });
  }

  public getJDBCUrl() {
    const endpoint = this.cluster.attrEndpointAddress;
    const port = this.cluster.attrEndpointPort;
    return `jdbc:redshift://${endpoint}:${port}/warehouse`;
  }
}
