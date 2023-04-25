import { Construct } from "constructs";
import { CfnCluster } from "aws-cdk-lib/aws-redshift";

export default class DataWarehouse extends Construct {
  cluster: CfnCluster;

  dbName = "dev";

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.cluster = new CfnCluster(this, "RedshiftCluster", {
      clusterType: "single-node",
      dbName: this.dbName,
      masterUsername: "username",
      masterUserPassword: "Password1",
      nodeType: "dc2.large",
      publiclyAccessible: true,
    });

    // this.cluster = new Cluster(this, "RedshiftCluster", {
    //   clusterType: ClusterType.SINGLE_NODE,
    //   nodeType: NodeType.DC2_LARGE,
    //   defaultDatabaseName: this.dbName,
    //   masterUser: {
    //     masterUsername: "username",
    //     masterPassword: SecretValue.unsafePlainText("Password1"),
    //   },
    //   vpc: Vpc.fromLookup(this, "DefaultVPC", { isDefault: true }),
    //   port: this.port,
    //   publiclyAccessible: true,
    // });

    // new Table(this, "DevTable", {
    //   cluster: this.cluster,
    //   databaseName: this.dbName,
    //   tableColumns: [
    //     { name: "id", dataType: "varchar(32)", distKey: true },
    //     { name: "name", dataType: "varchar(32)" },
    //     { name: "practice", dataType: "varchar(32)" },
    //   ],
    //   tableName: "practice",
    //   distStyle: TableDistStyle.KEY,
    // });
  }

  public getJDBCUrl() {
    const endpoint = this.cluster.attrEndpointAddress;
    const port = this.cluster.attrEndpointPort;
    return `jdbc:redshift://${endpoint}:${port}/dev`;
  }
}
