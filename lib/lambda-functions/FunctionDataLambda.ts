async function handler(event: any, context: any) {
  return {
    statusCode: 200,
    body: "Welcome to Lambda.",
  };
}

export { handler };
