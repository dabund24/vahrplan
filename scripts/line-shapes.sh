#!/bin/bash

echo "fetching line shapes..."

for file in line-colors.csv line-colors-AT.csv line-colors-CH.csv line-colors-SE.csv line-colors-VBN.csv
do
  curl -L \
       --url "https://raw.githubusercontent.com/Traewelling/line-colors/refs/heads/main/$file" \
       --create-dirs -o "./assets/$file"
done
