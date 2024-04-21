#!/bin/bash

echo "{ \"countries\" : $(curl https://restcountries.com/v3.1/all) }" | jq > ./data.json