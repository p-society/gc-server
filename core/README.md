# core

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

1. Create a Player

Request : 

POST http:127.0.0.1:3030/player

```
curl --location 'http://127.0.0.1:3030/player' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"b422056@iiit-bh.ac.in",
    "firstName":"Soubhik",
    "lastName":"Gon"1
    "password":"b422056",
    "role":32768,
    "sport":"football",
    "branch":"it",
    "year":2,
    "contactNo":"6370462354",
    "socials":[{
        "instagram":"soubhikgon_",
        "linkedin":"soubhikgon"
    }]
}'
```

Response: 

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXIiOnsiZW1haWwiOiJiNDIyMDU2QGlpaXQtYmguYWMuaW4iLCJmaXJzdE5hbWUiOiJTb3ViaGlrIiwibGFzdE5hbWUiOiJHb24iLCJwYXNzd29yZCI6IiQyYSQxMCRoQjh4VzczYllKY0thSmV6Um9qem4uRk42bkxPMHZWZXJZNG1SVTlOU25UQzEub1VyLlBwVyIsInJvbGUiOjEsInNwb3J0IjoiZm9vdGJhbGwiLCJicmFuY2giOiJpdCIsInllYXIiOjIsImNvbnRhY3RObyI6IjYzNzA0NjIzNTQiLCJzb2NpYWxzIjpbeyJpbnN0YWdyYW0iOiJzb3ViaGlrZ29uXyIsImxpbmtlZGluIjoic291Ymhpa2dvbiJ9XX0sIm90cCI6Nzk2MzIsImlhdCI6MTcwOTQ2NzU1Nn0.PJW_PJnrrbGM1bbKfac7qWGXHHn5N0Mnw79zFG7ZtUA"
}
```


2. Verification Player

Request :

POST http://127.0.0.1:3030/player/verification

```
curl --location 'http://127.0.0.1:3030/player/verification' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXIiOnsiZW1haWwiOiJiNDIyMDU2QGlpaXQtYmguYWMuaW4iLCJmaXJzdE5hbWUiOiJTb3ViaGlrIiwibGFzdE5hbWUiOiJHb24iLCJwYXNzd29yZCI6IiQyYSQxMCRoQjh4VzczYllKY0thSmV6Um9qem4uRk42bkxPMHZWZXJZNG1SVTlOU25UQzEub1VyLlBwVyIsInJvbGUiOjEsInNwb3J0IjoiZm9vdGJhbGwiLCJicmFuY2giOiJpdCIsInllYXIiOjIsImNvbnRhY3RObyI6IjYzNzA0NjIzNTQiLCJzb2NpYWxzIjpbeyJpbnN0YWdyYW0iOiJzb3ViaGlrZ29uXyIsImxpbmtlZGluIjoic291Ymhpa2dvbiJ9XX0sIm90cCI6Nzk2MzIsImlhdCI6MTcwOTQ2NzU1Nn0.PJW_PJnrrbGM1bbKfac7qWGXHHn5N0Mnw79zFG7ZtUA' \
--header 'Content-Type: application/json' \
--data '{
    "otp":79632
}'
```

Response :

```
{
    "firstName": "Soubhik",
    "lastName": "Gon",
    "email": "b422056@iiit-bh.ac.in",
    "password": "$2a$10$hB8xW73bYJcKaJezRojzn.FN6nLO0vVerY4mRU9NSnTC1.oUr.PpW",
    "role": "1",
    "sport": "football",
    "branch": "it",
    "year": 2,
    "contactNo": "6370462354",
    "socials": [
        {
            "instagram": "soubhikgon_",
            "linkedin": "soubhikgon"
        }
    ],
    "isDeleted": false,
    "_id": "65e46a9ff6c215083c5b4afc",
    "createdAt": "2024-03-03T12:18:39.317Z",
    "updatedAt": "2024-03-03T12:18:39.317Z",
    "__v": 0
}
```

3. Login 

Request :

POST http://127.0.0.1:3030/authenticate

```
curl --location 'http://127.0.0.1:3030/authentication' \
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
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MDk0Njg0NzgsImV4cCI6MTc0MTAwNDQ3OCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjVlNDZhOWZmNmMyMTUwODNjNWI0YWZjIiwianRpIjoiYjNiZmE0NjktNjdiMS00ZWNmLTkyZWItNTMwZWI0OWVkZjFlIn0.ji7tjDmk-e99XZxy6N77FpOok2QNGBsZfoI-IiMskME",
    "authentication": {
        "strategy": "local",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MDk0Njg0NzgsImV4cCI6MTc0MTAwNDQ3OCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjVlNDZhOWZmNmMyMTUwODNjNWI0YWZjIiwianRpIjoiYjNiZmE0NjktNjdiMS00ZWNmLTkyZWItNTMwZWI0OWVkZjFlIn0.ji7tjDmk-e99XZxy6N77FpOok2QNGBsZfoI-IiMskME",
        "payload": {
            "iat": 1709468478,
            "exp": 1741004478,
            "aud": "https://yourdomain.com",
            "iss": "feathers",
            "sub": "65e46a9ff6c215083c5b4afc",
            "jti": "b3bfa469-67b1-4ecf-92eb-530eb49edf1e"
        }
    },
    "player": {
        "_id": "65e46a9ff6c215083c5b4afc",
        "firstName": "Soubhik",
        "lastName": "Gon",
        "email": "b422056@iiit-bh.ac.in",
        "role": "1",
        "sport": "football",
        "branch": "it",
        "year": 2,
        "contactNo": "6370462354",
        "socials": [
            {
                "instagram": "soubhikgon_",
                "linkedin": "soubhikgon"
            }
        ],
        "isDeleted": false,
        "createdAt": "2024-03-03T12:18:39.317Z",
        "updatedAt": "2024-03-03T12:18:39.317Z",
        "__v": 0
    }
}
```

</details>

4. Patch a Player 

Request : 

PATCH http://127.0.0.1:3030/player

```
curl --location --request PATCH 'http://127.0.0.1:3030/player/65e46a9ff6c215083c5b4afc' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MDk0Njg3NTcsImV4cCI6MTc0MTAwNDc1NywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjVlNDZhOWZmNmMyMTUwODNjNWI0YWZjIiwianRpIjoiMGMxNjBhYTItZGM0OC00ZjdjLWEwYmEtYWU3OWQxNTQ2NTY4In0.hwgaTxyfROYHUuWdn4rsTYpfcdq0sfq82iqipqy_RbY' \
--header 'Content-Type: application/json' \
--data '{
    "firstName":"Test"
}'
```

```
{
    "_id": "65e46a9ff6c215083c5b4afc",
    "firstName": "Test",
    "lastName": "Gon",
    "email": "b422056@iiit-bh.ac.in",
    "role": "1",
    "sport": "football",
    "branch": "it",
    "year": 2,
    "contactNo": "6370462354",
    "socials": [
        {
            "instagram": "soubhikgon_",
            "linkedin": "soubhikgon"
        }
    ],
    "isDeleted": false,
    "createdAt": "2024-03-03T12:18:39.317Z",
    "updatedAt": "2024-03-03T12:26:33.962Z",
    "__v": 0
}
```

5. Delete a Player

Request: 

DELETE http://127.0.0.1:3030/65e46e31f966475b12fed6b0

```
curl --location --request DELETE 'http://127.0.0.1:3030/player/65e46e31f966475b12fed6b0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MDk0NjkzMDMsImV4cCI6MTc0MTAwNTMwMywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjVlNDZlMzFmOTY2NDc1YjEyZmVkNmIwIiwianRpIjoiMDA2ZTdhZWMtMDFiNS00MGFmLTg0Y2QtMGM3MTNhMGNkYTk5In0.nPp332b4H0_iswyT0xrL899Q6eqZHnJGElsIbb7Dlf0' \
--data ''
```

Response:

TBD (deleted tho)
