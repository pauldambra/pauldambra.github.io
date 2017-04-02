My super-good awesome-fun blog

Uses github pages flavour of Jekyll with guard and live-reload added in for local dev

## to run:

`BUNDLE_ENV='dev' bundle exec guard`

## Manual Spell checking runs

markdown spellchecker is an awesome tool. To run it in interactive mode:

```bash
 node_modules/.bin/mdspell _posts/*.md \
  --en-gb \
  --ignore-numbers \
  --ignore-acronyms \
  --no-suggestions
  ```