import * as cdk from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import DataDB from "./constructs/DataDB";
import DataIAM from "./constructs/DataIAM";
import DataLambda from "./constructs/DataLambda";
import DataDeliveryStream from "./constructs/DataDeliveryStream";
import DataWarehouse from "./constructs/DataWarehouse";

export class MattProjectDataProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dataIAM = new DataIAM(this, "DataIAM");

    const dataDB = new DataDB(this, "DynamoDB");

    const redshift = new DataWarehouse(this, "Redshift");

    new DataLambda(this, "Lambda", { lambdaRole: dataIAM.getRoles().lambdaRole, dataTable: dataDB.getTable() });

    const sourceBucket = new Bucket(this, "Bucket");

    new DataDeliveryStream(this, "DeliveryStream", {
      clusterJdbcurl: redshift.getJDBCUrl(),
      kinesisFirehoseRoleArn: dataIAM.getRoles().firehoseRole.roleArn,
      sourceBucketArn: sourceBucket.bucketArn,
    });
  }
}
