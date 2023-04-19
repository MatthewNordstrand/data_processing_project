import { AttributeType, StreamViewType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Stream } from "aws-cdk-lib/aws-kinesis";
import { Construct } from "constructs";

export default class DataDB extends Construct {
  stream: Stream;
  table: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.initKinesisStream();
    this.initDatabase();
  }

  private initKinesisStream() {
    this.stream = new Stream(this, "KinesisStream", {
      shardCount: 1,
    });
  }

  private initDatabase() {
    this.table = new Table(this, "Table", {
      partitionKey: { name: "id", type: AttributeType.STRING },
      kinesisStream: this.stream,
      stream: StreamViewType.NEW_IMAGE,
    });
  }

  public getTable() {
    return this.table;
  }
}
