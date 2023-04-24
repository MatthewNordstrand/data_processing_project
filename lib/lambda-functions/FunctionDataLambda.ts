import { SSM, Firehose } from "aws-sdk";

// const streamName = ssm.getParameter({ Name: "/mattdata/deliverystream/name" }, (err, data) => {

// });

async function handler(event: any) {
  const ssm = new SSM();
  const streamName = (await ssm.getParameter({ Name: "/mattdata/deliverystream/name" }).promise()).Parameter?.Value;

  if (!streamName) throw new Error("Unable to get the name for the Firehose Delivery Stream.");

  const processedRecords = event.Records.map((record: any) => {
    const image = record.dynamodb.NewImage;

    const transformedData = {
      id: image.id?.S,
      name: image.name?.S,
      practice: image.practice?.S,
    };

    console.log(`Data: ${JSON.stringify(transformedData)}`);

    const blob = Buffer.from(JSON.stringify(transformedData));

    return {
      Data: blob,
    };
  });

  const firehose = new Firehose();
  firehose.putRecordBatch({ DeliveryStreamName: streamName, Records: processedRecords }, (err, _data) => {
    if (err) throw new Error(err.stack);
  });
}

export { handler };
