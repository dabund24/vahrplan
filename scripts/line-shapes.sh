#!/bin/bash

echo "fetching line shapes..."

# DE
curl -L \
     --url 'https://raw.githubusercontent.com/Traewelling/line-colors/refs/heads/main/line-colors.csv' \
     --create-dirs -o './assets/line-shapes-de.csv'

# AT
curl -L \
     --url 'https://raw.githubusercontent.com/Traewelling/line-colors/refs/heads/main/line-colors-AT.csv' \
     --create-dirs -o './assets/line-shapes-at.csv'

