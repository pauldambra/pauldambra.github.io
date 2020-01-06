#! /bin/bash

set -eu

AMPDIRECTORY='_site/amp'

if [ ! -d "$AMPDIRECTORY" ]; then
  echo "$AMPDIRECTORY doesn't exist"
  exit 1
fi

for f in `find $AMPDIRECTORY -type f -name '*.html'`; do
  npx amphtml-validator $f
done
