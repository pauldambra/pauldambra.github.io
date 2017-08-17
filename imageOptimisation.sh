#! /bin/bash

set -eux

find ./images -name "*.jpg" -type f -exec jpegtran -copy none -optimize -progressive -perfect -outfile {} {} \;
find ./images/ -name "*.png" -type f -print0 |xargs -n 1 -P 4 -0 optipng -o7