#! /bin/bash

set -eu

npm install -g amphtml-validator

for f in `find _site/amp -type f -name '*.html'`; do
  amphtml-validator $f
done
