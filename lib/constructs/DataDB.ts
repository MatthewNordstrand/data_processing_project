import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export default class DataDB extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.initDatabase();
  }

  private initDatabase() {
    new Table(this, "Table", {
      partitionKey: { name: "id", type: AttributeType.STRING },
    });
  }
}
