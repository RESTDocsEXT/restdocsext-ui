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
          "requestBody": "{ \\"name\\": \\"Felix\\" }",
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
        },
        {
          "name": "Delete a cat",
          "collection": "Cats",
          "path": "/cats/{id}",
          "httpMethod": "DELETE",
          "pathParameters": {
            "id": "the identifier of the cat"
          }
        },
        {
          "name": "Update a cat",
          "collection": "Cats",
          "path": "/cats/{id}",
          "httpMethod": "PUT",
          "pathParameters": {
            "id": "the identifier of the cat"
          },
          "requestBody": "{ \\"id\\": 1, \\"name\\": \\"Fluffy\\" }"
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
          "requestBody": "{ \\"name\\": \\"McGruff\\" }",
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
        },
        {
          "name": "Delete a dog",
          "collection": "Dogs",
          "path": "/dogs/{id}",
          "httpMethod": "DELETE",
          "pathParameters": {
            "id": "the identifier of the dog"
          }
        },
        {
          "name": "Update a dog",
          "collection": "Dogs",
          "path": "/dogs/{id}",
          "httpMethod": "PUT",
          "pathParameters": {
            "id": "the identifier of the dog"
          },
          "requestBody": "{ \\"id\\": 1, \\"name\\": \\"Clifford\\" }"
        }
      ]
    },
    {
      "name": "Birds",
      "apis": [
        {
          "name": "Create a bird",
          "collection": "Birds",
          "path": "/birds",
          "httpMethod": "POST",
          "requestBody": "{ \\"name\\": \\"Scrooge\\" }",
          "responseHeaders": {
            "Location": "the newly created URI for the bird"
          }
        },
        {
          "name": "Get all birds",
          "collection": "Birds",
          "path": "/birds",
          "httpMethod": "GET",
          "requestParameters": {
            "limit": "limit the number of results"
          }
        },
        {
          "name": "Get a bird",
          "collection": "Birds",
          "path": "/birds/{id}",
          "httpMethod": "GET",
          "pathParameters": {
            "id": "the identifier of the bird"
          }
        },
        {
          "name": "Delete a bird",
          "collection": "Birds",
          "path": "/birds/{id}",
          "httpMethod": "DELETE",
          "pathParameters": {
            "id": "the identifier of the bird"
          }
        },
        {
          "name": "Update a bird",
          "collection": "Birds",
          "path": "/birds/{id}",
          "httpMethod": "PUT",
          "pathParameters": {
            "id": "the identifier of the dog"
          },
          "requestBody": "{ \\"id\\": 1, \\"name\\": \\"Big Bird\\" }"
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
