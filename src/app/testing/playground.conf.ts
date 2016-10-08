import { PLAYGROUND_CONFIG } from '../index';

export const playgroundJson =
`{
  "config": {
    "homePage": "Introduction",
    "organizationName": "PetStore API",
    "organizationLink": "http://stackoverflow.com",
    "pages": [
      "Authentication",
      "Introduction"
    ]
  },
  "baseUri": "http://api.petstore.com/api",
  "collections": [
    {
      "name": "Cats",
      "apis": [
        {
          "name": "Create a cat",
          "collection": "Cats",
          "path": "/cats",
          "httpMethod": "POST",
          "requestBody": "request body",
          "requestHeaders": {
            "Content-Type": "The media type of the content"
          },
          "responseHeaders": {
            "Location": "the newly created URI for the cat"
          }
        },
        {
          "name": "Get all cats",
          "collection": "Cats",
          "path": "/cats",
          "httpMethod": "GET",
          "requestParameters": {
            "limit": "limit the number of results"
          }
        },
        {
          "name": "Get a cat",
          "collection": "Cats",
          "path": "/cats/{id}",
          "httpMethod": "GET",
          "pathParameters": {
            "id": "the identifier of the cat"
          }
        }
      ]
    },
    {
      "name": "Dogs",
      "apis": [
        {
          "name": "Create a dog",
          "collection": "Dogs",
          "path": "/dogs",
          "httpMethod": "POST",
          "requestBody": "request body",
          "responseHeaders": {
            "Location": "the newly created URI for the dog"
          }
        },
        {
          "name": "Get all cats",
          "collection": "Dogs",
          "path": "/dogs",
          "httpMethod": "GET",
          "requestParameters": {
            "limit": "limit the number of results"
          }
        },
        {
          "name": "Get a dog",
          "collection": "Dogs",
          "path": "/dogs/{id}",
          "httpMethod": "GET",
          "pathParameters": {
            "id": "the identifier of the dog"
          }
        }
      ]
    }
  ]
}`;

export const mockJsonOperation =
`{
  "name": "Create a cat",
  "collection": "Cats",
  "path": "/cats",
  "httpMethod": "POST",
  "requestBody": "request body",
  "description": "Create a cat",
  "responseHeaders": {
    "Location": "the newly created URI for the cat"
  },
  "requestHeaders": {
    "Content-Type": "the content type of the body"
  },
  "requestParameters": {
    "sort": "sort by these properties"
  },
  "pathParameters": {
    "id": "the id of the cat"
  }
}`;

export const MOCK_CONFIG_PROVIDER = {
  provide: PLAYGROUND_CONFIG,
  useValue: playgroundJson
};
