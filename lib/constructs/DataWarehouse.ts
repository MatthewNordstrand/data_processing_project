import { CfnCluster } from "aws-cdk-lib/aws-redshift";
import { Construct } from "constructs";
import { Cluster, ClusterType, NodeType, Table, TableDistStyle } from "@aws-cdk/aws-redshift-alpha";
import { SecretValue } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2/lib/vpc";

export default class DataWarehouse extends Construct {
  cluster: Cluster;

  port = 5439;
  dbName = "dev";

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.cluster = new Cluster(this, "RedshiftCluster", {
      clusterType: ClusterType.SINGLE_NODE,
      nodeType: NodeType.DC2_LARGE,
      defaultDatabaseName: this.dbName,
      masterUser: {
        masterUsername: "username",
        masterPassword: SecretValue.unsafePlainText("Password1"),
      },
      vpc: Vpc.fromLookup(this, "DefaultVPC", { isDefault: true }),
      port: this.port,
    });

    new Table(this, "DevTable", {
      cluster: this.cluster,
      databaseName: this.dbName,
      tableColumns: [
        { name: "id", dataType: "varchar(32)", distKey: true },
        { name: "name", dataType: "varchar(32)" },
        { name: "practice", dataType: "varchar(32)" },
      ],
      tableName: "practice",
      distStyle: TableDistStyle.KEY,
    });
  }

  public getJDBCUrl() {
    const endpoint = this.cluster.clusterEndpoint;
    return `jdbc:redshift://${endpoint}:${this.port}/${this.dbName}`;
  }
}
