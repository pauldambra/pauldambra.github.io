#! /bin/bash

set -eu

bundle exec htmlproofer --file-ignore _site\/amp\/.*,_site\/.git\/.* --only-4xx --check-favicon --check-html