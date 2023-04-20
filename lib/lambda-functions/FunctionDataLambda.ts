async function handler(event: any, context: any) {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);

  return {
    statusCode: 200,
  };
}

export { handler };
