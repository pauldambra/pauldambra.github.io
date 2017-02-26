#! /bin/bash

set -eu

bundle exec htmlproofer \
  _site \
  --file-ignore /amp/,/.git/ \
  --check-favicon \
  --check-html \
  --check-opengraph