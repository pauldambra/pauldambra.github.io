#! /bin/bash

node_modules/.bin/remark . --use lint --frail

node_modules/.bin/mdspell _posts/*.md \
  --report \
  --en-gb \
  --ignore-numbers \
  --ignore-acronyms

node_modules/.bin/alex _posts