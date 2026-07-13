#!/usr/bin/env bash
# exit on error
set -o errexit

npm install --force
npm run build

pip install pipenv

pipenv install

pipenv run upgrade