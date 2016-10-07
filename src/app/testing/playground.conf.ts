
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
