#! /bin/bash

set -eu

DEPLOY_REPO="https://${DEPLOY_BLOG_TOKEN}@github.com/pauldambra/pauldambra.github.io.git"

function main {
	clean
	get_current_site
  update_service_worker
	build_site
  minify_site
}

function clean { 
	echo "cleaning _site folder"
	if [ -d "_site" ]; then rm -Rf _site; fi 
  if [ -d "git.log" ]; then rm git.log; fi 
}

function get_current_site { 
	echo "getting latest site"
	git clone --depth 1 $DEPLOY_REPO _site > git.log 2>&1
  cat git.log | echo
}

function update_service_worker {
  echo "updating service worker"
  npm install sw-precache
  ./node_modules/.bin/sw-precache --config service-worker-config.js
}

function build_site { 
	echo "building site"
	bundle exec jekyll build 
}

function minify_site {
  npm install html-minifier

  ./node_modules/.bin/html-minifier \
    --html5 \
    --case-sensitive \
    --keep-closing-slash \
    --collapse-inline-tag-whitespace \
    --collapse-whitespace \
    --minify-css \
    --minify-js \
    --input-dir _site \
    --output-dir _site2 \
    --file-ext html

  rm -rf _site/
  mv _site2 _site
}

main