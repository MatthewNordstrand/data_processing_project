import { CfnDeliveryStream } from "aws-cdk-lib/aws-kinesisfirehose";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

interface DataDeliveryStreamProps {
  clusterJdbcurl: string;
  sourceBucketArn: string;
  kinesisFirehoseRoleArn: string;
}

export default class DataDeliveryStream extends Construct {
  constructor(scope: Construct, id: string, props: DataDeliveryStreamProps) {
    super(scope, id);

    const stream = new CfnDeliveryStream(this, "DeliveryStream", {
      deliveryStreamName: "matt-data-transformation",
      redshiftDestinationConfiguration: {
        clusterJdbcurl: props.clusterJdbcurl,
        copyCommand: { dataTableName: "transformation", copyOptions: "json 'auto'" },
        roleArn: props.kinesisFirehoseRoleArn,
        s3Configuration: { bucketArn: props.sourceBucketArn, roleArn: props.kinesisFirehoseRoleArn },
        username: "username",
        password: "Password1",
      },
    });

    new StringParameter(this, "StreamArn", {
      parameterName: "/mattdata/deliverystream/name",
      stringValue: stream.deliveryStreamName!,
    });
  }
}
