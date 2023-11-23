export default defineEventHandler(() => {
  return {
    $schema: "http://json-schema.org/draft-07/schema",
    description: "Configuration for examples on lesetid.dev",
    additionalProperties: false,
    type: "object",
    properties: {
      iconUrl: {
        oneOf: [
          {
            description: "The url to the icon",
            pattern: "^/",
            type: "string",
          },
          {
            type: "object",
            properties: {
              light: {
                description: "The url to the icon",
                pattern: "^/",
                type: "string",
              },
              dark: {
                description: "The url to the icon",
                pattern: "^/",
                type: "string",
              },
            },
            required: [
              "light",
              "dark",
            ],
          },
        ],
      },
      title: {
        description: "The title of the example",
        type: "string",
      },
      url: {
        description: "The url to the example",
        format: "uri",
        type: "string",
      },
      $schema: {
        description: "The schema uri to use, this is only here to make additionalProperties not warn.",
        type: "string",
      },
      stackblitz: {
        description: "The url to the stackblitz",
        format: "uri",
        type: "string",
      },
      codesandbox: {
        description: "The url to the codesandbox",
        format: "uri",
        type: "string",
      },
      codespaces: {
        description: "The url to the codespaces",
        format: "uri",
        type: "string",
      },
    },
    required: [
      "title",
      "url",
      "$schema",
      "stackblitz",
      "codesandbox",
      "codespaces",
    ],
  };
});