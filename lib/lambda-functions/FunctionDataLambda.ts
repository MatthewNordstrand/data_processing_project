import { SSM, Firehose } from "aws-sdk";

let _streamName: string | undefined;

async function handler(event: any) {
  const streamName = await getStreamName();

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

async function getStreamName() {
  //Perhaps change this all to a one-time initialization so I don't have to use Custom Resource?

  if (!_streamName) {
    const ssm = new SSM();
    _streamName = (await ssm.getParameter({ Name: "/mattdata/deliverystream/name" }).promise()).Parameter?.Value;
  }

  return _streamName;
}

export { handler };
