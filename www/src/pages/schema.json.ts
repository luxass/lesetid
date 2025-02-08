export async function GET() {
  return new Response(
    JSON.stringify({
      $schema: "http://json-schema.org/draft-07/schema",
      description: "Configuration for examples on lesetid.dev",
      type: "object",
      properties: {
        iconUrl: {
          description: "The url to the icon",
          pattern: "^/",
          type: "string",
        },
        title: {
          description: "The title of the example",
          type: "string",
        },
        handle: {
          description: "The handle of the example",
          type: "string",
        },
        url: {
          description: "The url to the example",
          pattern: "^/",
          type: "string",
        },
        providers: {
          type: "object",
          properties: {
            stackblitz: {
              description: "The url to StackBlitz",
              format: "uri",
              type: "string",
            },
            codesandbox: {
              description: "The url to CodeSandbox",
              format: "uri",
              type: "string",
            },
          },
          additionalProperties: false,
          required: [],
        },
      },
      required: [
        "title",
        "url",
        "handle",
        "providers",
      ],
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
