#! /bin/bash

function main {
  npm install
  lint_markdown
  lint_spelling
  lint_meaning
}

function lint_markdown {
  node_modules/.bin/remark . --use lint --frail
}

function lint_spelling {
  node_modules/.bin/mdspell _posts/**.md \
    --en-gb \
    --ignore-numbers \
    --ignore-acronyms \
    --report
}

function lint_meaning {
  node_modules/.bin/alex _posts --diff --why
}

main