import { SSM, Firehose, Redshift, RedshiftData } from "aws-sdk";

let _streamName: string | undefined;
let _dbinitialized = false;

async function handler(event: any) {
  const { streamName } = await init();

  if (!streamName) throw new Error("Unable to get the name for the Firehose Delivery Stream.");

  const processedRecords = event.Records.map((record: any) => {
    const image = record.dynamodb.NewImage;

    const transformedData = {
      id: image.id?.S,
      name: image.name?.S,
      practice: image.practice?.S,
    };

    console.log(`Data: ${JSON.stringify(transformedData)}`);

    return {
      Data: JSON.stringify(transformedData),
    };
  });

  const firehose = new Firehose();
  await firehose
    .putRecordBatch({ DeliveryStreamName: streamName, Records: processedRecords }, (err, _data) => {
      if (err) throw new Error(err.stack);
      else console.log("Successfully put data into stream!");
    })
    .promise();
}

async function init() {
  if (!_streamName) {
    const ssm = new SSM();
    _streamName = (await ssm.getParameter({ Name: "/mattdata/deliverystream/name" }).promise()).Parameter?.Value;
  }

  if (!_dbinitialized) {
    const query =
      "CREATE TABLE practicetable (id VARCHAR(255) NOT NULL PRIMARY KEY, name VARCHAR(255), practice VARCHAR(255));";

    const redshift = new RedshiftData();
    await redshift
      .executeStatement({
        Database: "dev",
        Sql: query,
        ClusterIdentifier: "mattdata-cluster",
      })
      .promise();

    _dbinitialized = true;
  }

  return { streamName: _streamName, dbinitialized: _dbinitialized };
}

export { handler };
