#! /bin/bash

if [ ! -f node_modules/.bin/remark ]; then
    npm install
fi

node_modules/.bin/remark . --use lint --frail

node_modules/.bin/mdspell _posts/2014-05-18-promises.md \
  --en-gb \
  --ignore-numbers \
  --ignore-acronyms

node_modules/.bin/alex _posts