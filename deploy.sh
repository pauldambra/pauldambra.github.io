#! /bin/bash

set -eu

DEPLOY_REPO="https://${DEPLOY_BLOG_TOKEN}@github.com/pauldambra/pauldambra.github.io.git"

echo "deploying changes"

if [ -z "$TRAVIS_PULL_REQUEST" ]; then
    echo "except don't publish site for pull requests"
    exit 0
fi  

if [ "$TRAVIS_BRANCH" != "master" ]; then
    echo "except we should only publish the master branch. stopping here"
    exit 0
fi

cd _site
git config --global user.name "Travis CI"
git config --global user.email paul.dambra+ttravis@gmail.com
git add -A
git fetch --progress
git status
git commit -m "Latest site built on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to github"
exit `git push $DEPLOY_REPO`