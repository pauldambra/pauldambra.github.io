#! /bin/bash

set -eu

npm install -g amphtml-validator

AMPFILES=`find _site/amp -type f -name '*.html'`

for f in $AMPFILES; do
  amphtml-validator $f
done
