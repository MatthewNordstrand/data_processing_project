import { Construct } from "constructs";
import { CfnCluster } from "aws-cdk-lib/aws-redshift";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Peer, Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";

export default class DataWarehouse extends Construct {
  cluster: CfnCluster;

  dbName = "dev";

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const securityGroup = new SecurityGroup(this, "RedshiftSG", {
      vpc: Vpc.fromLookup(this, "VPC", { isDefault: true }),
    });

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(5439));
    securityGroup.addIngressRule(Peer.anyIpv6(), Port.tcp(5439));

    this.cluster = new CfnCluster(this, "RedshiftCluster", {
      clusterIdentifier: "mattdata-cluster",
      clusterType: "single-node",
      dbName: this.dbName,
      masterUsername: "username",
      masterUserPassword: "Password1",
      nodeType: "dc2.large",
      publiclyAccessible: true,
      vpcSecurityGroupIds: [securityGroup.securityGroupId],
    });

    this.dbInitializedParam();
  }

  private dbInitializedParam() {
    const paramName = "/mattdata/redshift/dbinitialized";

    new StringParameter(this, "DBInitializedParam", {
      parameterName: paramName,
      stringValue: "false",
    });
  }

  public getJDBCUrl() {
    const endpoint = this.cluster.attrEndpointAddress;
    const port = this.cluster.attrEndpointPort;
    return `jdbc:redshift://${endpoint}:${port}/dev`;
  }
}
