import { CfnDeliveryStream } from "aws-cdk-lib/aws-kinesisfirehose";
import { Construct } from "constructs";

interface DataDeliveryStreamProps {
  clusterJdbcurl: string;
  sourceBucketArn: string;
  kinesisFirehoseRoleArn: string;
}

export default class DataDeliveryStream extends Construct {
  constructor(scope: Construct, id: string, props: DataDeliveryStreamProps) {
    super(scope, id);

    new CfnDeliveryStream(this, "DeliveryStream", {
      redshiftDestinationConfiguration: {
        clusterJdbcurl: props.clusterJdbcurl,
        copyCommand: { dataTableName: "transformation" },
        roleArn: props.kinesisFirehoseRoleArn,
        s3Configuration: { bucketArn: props.sourceBucketArn, roleArn: props.kinesisFirehoseRoleArn },
        username: "username",
        password: "password",
      },
    });
  }
}
