#!/bin/bash

make_api_call() {
    local email="$1"
    local password="$2"
    local branch="$3"
    local payload='{
        "firstName": "user",
        "lastName": "1",
        "email": "'"$email"'",
        "password": "'"$password"'",
        "role": 1,
        "branch": "'"$branch"'",
        "year": 2,
        "contactNo": "1234567890"
    }'
    local url="http://127.0.0.1:3030/users"
    curl -X POST -H "Content-Type: application/json" -d "$payload" "$url"
}

main() {
    branches=('it' 'cse' 'eee')

    for i in {0..3}; do
        echo "deezBalls"
        branch="${branches[$((RANDOM % ${#branches[@]}))]}"
        email="test${RANDOM}@gmail.com"
        password="test${RANDOM}"
        make_api_call "$email" "$password" "$branch" &
    done
}

# Be careful while running this dawgs
for i in {0..2}; do
    main
done