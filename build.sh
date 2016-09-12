#! /bin/bash

set -e

DEPLOY_REPO="git@github.com:pauldambra/pauldambra.github.io.git"

rm -rf _site
if [ -d "_site" ]; then rm -Rf _site; fi

git clone --depth 1 $DEPLOY_REPO _site

bundle exec jekyll build

if [ -z "$TRAVIS_PULL_REQUEST" ]; then
    echo "don't publish site for pull requests"
    exit 0
fi  

if [ -z "$TRAVIS_BRANCH" ]; then
    echo "only publish the master branch"
    exit 0
fi

cd _site
git config user.name "Travis CI"
git commit -m "Lastest site built on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to github"
git push origin master
