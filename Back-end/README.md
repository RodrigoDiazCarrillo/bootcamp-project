<h1 align="center">Fix_4u <br>-RESTful API-</h1>

## Built With
[![Node.js](https://img.shields.io/badge/Node.js-v.16.15.0-green.svg?style=flat-square&logo=appveyor)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=flat-square&logo=appveyor)](https://expressjs.com/en/starter/installing.html) [![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.14-blue?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/mysql) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v8.5.1-blue?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/jsonwebtoken)

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Star

Run `npm run dev`for development

### HTTP Requests

-   `GET`  Get a resource or list of resources
-   `POST`  Create a resource
-   `PATCH`  Update a resource
-   `DELETE`  Delete a resource

## Endpoints
**IMPORTANT!** All endpoint except **Login** and **Register** must have **header** :

- **Content-Type** : **`application/json`**
- **Authorization**: **`Bearer token`**

|      TYPE  |  METHOD|       URL                        |        BODY
| :---------- | :---- | :--------------------------------|:---------------------------------------------------------------------------------------------------------------
| `LOGIN`       | `POST`|`http://127.0.0.1:8000/login`  |`{"email": "","password": ""`            
| `NEW USER`    | `POST`| `http://127.0.0.1:8000/login/new`|`{"first_name":"", "last_name":"", email": "","password": ""}`
| `DELETE USER` | `DELETE`| `http://127.0.0.1:8000/members/delete:id`|--
| `EDIT USER`   | `PATCH`|`http://127.0.0.1:8000/members/update:id`|`{"first_name":"", "last_name":"", email": "","password": ""}`
| `ALL USERS`   | `GET`| `http://127.0.0.1:8000/members`  |--
| `INSERT AD`   | `POST`| `http://127.0.0.1:8000/ad/new` | `{"user":"", "category":""," title": "","description": "","image":""}`
| `GET ALL ADS` | `GET`| `http://127.0.0.1:8000/ad/`       | --

### 📜 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) © Rodrigo Díaz