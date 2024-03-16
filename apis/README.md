# apis

> core service for gc server

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/core
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

-----------------------------------------------------

> [!CHANGELOG]  
> LAST UPDATED : Mar 16 18:16 IST

1. Create a User

Request :

POST {{HOST}}/users

```
curl --location 'http://20.81.43.214:3030/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "DivyaKumar",
    "lastName": " Patel",
    "email": "b122079@iiit-bh.ac.in",
    "password": "b122079",
    "role": 1,
    "branch": "cse",
    "year": 2,
    "contactNo": "1234567890"
}'
```


Response: 

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXIiOnsiZW1haWwiOiJiNDIyMDU2QGlpaXQtYmguYWMuaW4iLCJmaXJzdE5hbWUiOiJTb3ViaGlrIiwibGFzdE5hbWUiOiJHb24iLCJwYXNzd29yZCI6IiQyYSQxMCRoQjh4VzczYllKY0thSmV6Um9qem4uRk42bkxPMHZWZXJZNG1SVTlOU25UQzEub1VyLlBwVyIsInJvbGUiOjEsInNwb3J0IjoiZm9vdGJhbGwiLCJicmFuY2giOiJpdCIsInllYXIiOjIsImNvbnRhY3RObyI6IjYzNzA0NjIzNTQiLCJzb2NpYWxzIjpbeyJpbnN0YWdyYW0iOiJzb3ViaGlrZ29uXyIsImxpbmtlZGluIjoic291Ymhpa2dvbiJ9XX0sIm90cCI6Nzk2MzIsImlhdCI6MTcwOTQ2NzU1Nn0.PJW_PJnrrbGM1bbKfac7qWGXHHn5N0Mnw79zFG7ZtUA"
}
```

> [!NOTE]


2. OTP Verification :

Request :

POST {{HOST}}/users/verification

```
curl --location 'http://20.81.43.214:3030/users/verification' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6IlNvdWJoaWsgS3VtYXIgIiwibGFzdE5hbWUiOiJHb24iLCJlbWFpbCI6ImI0MjIwNTZAaWlpdC1iaC5hYy5pbiIsInBhc3N3b3JkIjoiJDJhJDEwJDBMZXVkUWp5OU9ONFlJenhpRjFkS2VKeFNMZDVTd2UwMU5NZldQRlBmMVNQRGx0dGt5akJTIiwicm9sZSI6MSwiYnJhbmNoIjoiaXQiLCJ5ZWFyIjoyLCJjb250YWN0Tm8iOiIxMjM0NTY3ODkwIn0sIm90cCI6ODkwMTk5LCJpYXQiOjE3MTA1OTEzODR9.ZjNUwmY69vKFT8GVrxXAXDTAhYlrLiUazeBOm0psCNs' \
--header 'Content-Type: application/json' \
--data '{
    "otp":890199
}'
```

Response :

```
{
    "firstName": "Soubhik Kumar ",
    "lastName": "Gon",
    "email": "b422056@iiit-bh.ac.in",
    "role": 1,
    "branch": "it",
    "year": 2,
    "contactNo": "1234567890",
    "_id": "65f58e5659ac83296d66e448",
    "createdAt": "2024-03-16T12:19:34.918Z",
    "updatedAt": "2024-03-16T12:19:34.918Z",
    "__v": 0
}
```


3. Login
Request :

POST {{HOST}}/authenticate

```
curl --location 'http://20.81.43.214:3030/authentication' \
--header 'Content-Type: application/json' \
--data-raw '{
    "strategy":"local",
    "email":"b422056@iiit-bh.ac.in",
    "password":"b422056"
}'
```

Response :

<details>
<summary>Click to view response </summary>

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MTA1OTIxNzIsImV4cCI6MTcxMDY3ODU3MiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjVmNThlNTY1OWFjODMyOTZkNjZlNDQ4IiwianRpIjoiOGM4MmIzMGItODg3Zi00ODQwLThmOTYtM2M2N2EwYjg1M2Q4In0.9glZxBzrWbj4gjwUhNsiQ-NMkr9xCLAL9fvhT7SYyiU",
    "authentication": {
        "strategy": "local",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MTA1OTIxNzIsImV4cCI6MTcxMDY3ODU3MiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjVmNThlNTY1OWFjODMyOTZkNjZlNDQ4IiwianRpIjoiOGM4MmIzMGItODg3Zi00ODQwLThmOTYtM2M2N2EwYjg1M2Q4In0.9glZxBzrWbj4gjwUhNsiQ-NMkr9xCLAL9fvhT7SYyiU",
        "payload": {
            "iat": 1710592172,
            "exp": 1710678572,
            "aud": "https://yourdomain.com",
            "iss": "feathers",
            "sub": "65f58e5659ac83296d66e448",
            "jti": "8c82b30b-887f-4840-8f96-3c67a0b853d8"
        }
    },
    "user": {
        "_id": "65f58e5659ac83296d66e448",
        "firstName": "Soubhik Kumar ",
        "lastName": "Gon",
        "email": "b422056@iiit-bh.ac.in",
        "role": 1,
        "branch": "it",
        "year": 2,
        "contactNo": "1234567890",
        "createdAt": "2024-03-16T12:19:34.918Z",
        "updatedAt": "2024-03-16T12:19:34.918Z",
        "__v": 0,
    }
}
```



5. Create Player 

Request :

POST {{HOST}}/player

```
curl --location 'http://20.81.43.214:3030/player' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MTA1OTIxNzIsImV4cCI6MTcxMDY3ODU3MiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjVmNThlNTY1OWFjODMyOTZkNjZlNDQ4IiwianRpIjoiOGM4MmIzMGItODg3Zi00ODQwLThmOTYtM2M2N2EwYjg1M2Q4In0.9glZxBzrWbj4gjwUhNsiQ-NMkr9xCLAL9fvhT7SYyiU' \
--header 'Content-Type: application/json' \
--data '{
  "user": "65f58e5659ac83296d66e448",
  "sport": "football",
  "socials": [
    {
      "platform": "Twitter",
      "username": "example_twitter"
    },
    {
      "platform": "Instagram",
      "username": "example_instagram"
    }
  ]
}
'
```

Response :

<details>
<summary>Click to view response </summary>

```
{
    "user": "65f58e5659ac83296d66e448",
    "sport": "football",
    "socials": [
        {
            "platform": "Twitter",
            "username": "example_twitter"
        },
        {
            "platform": "Instagram",
            "username": "example_instagram"
        }
    ],
    "deleted": false,
    "deletedAt": "2024-03-15T19:50:52.136Z",
    "_id": "65f5943a59ac83296d66e459",
    "createdAt": "2024-03-16T12:44:42.321Z",
    "updatedAt": "2024-03-16T12:44:42.321Z",
    "__v": 0
}
```

</details>
