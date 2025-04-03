#!/bin/bash

echo "fetching line shapes..."
curl -L \
     --url 'https://raw.githubusercontent.com/Traewelling/line-colors/refs/heads/main/line-colors.csv' \
     --create-dirs -o './assets/line-shapes.csv'
ls /app/assets/