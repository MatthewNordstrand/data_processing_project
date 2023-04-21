import { SSM, Firehose } from "aws-sdk";

async function handler(event: any) {
  console.log(`Event: ${JSON.stringify(event)}`);

  const ssm = new SSM();
  const streamArn = (await ssm.getParameter({ Name: "/mattdata/deliverystream/arn" }).promise()).Parameter?.Value;

  if (!streamArn) throw new Error("Unable to get the ARN for the Firehose Delivery Stream.");

  const firehose = new Firehose();
  firehose.putRecordBatch({ DeliveryStreamName: "no", Records: event.Records });

  // Yeeeeeahhhh! Progress!
  // const firehose = new Firehose();
  // firehose.putRecord(); //This call will put data into the stream.
}

export { handler };
