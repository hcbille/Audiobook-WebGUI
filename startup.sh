#!/bin/sh

FILE=./cred/credentials.json
if [ -f "$FILE" ]; then
    node main.js
else 
    echo "$FILE does not exist. Made a copy in /cred"
    mkdir ./cred
    cp credentials.json.template ./cred/credentials.json
    node main.js
fi