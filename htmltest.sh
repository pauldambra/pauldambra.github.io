#! /bin/bash

set -eu

bundle exec htmlproofer _site --file-ignore .*\/amp\/.*,.*\/.git\/.* --only-4xx --check-favicon --check-html