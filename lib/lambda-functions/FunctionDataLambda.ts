import { Firehose } from "aws-sdk";

async function handler(event: any, context: any) {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);

  // Yeeeeeahhhh! Progress!
  // const firehose = new Firehose();
  // firehose.putRecord(); //This call will put data into the stream.
}

export { handler };
