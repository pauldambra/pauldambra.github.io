#! /bin/bash

# find . -type f -name "*.md" -print0 | 
# xargs sed -i '' "s/<a href=\"\(.*\)\">\(.*\)<\/a>/[\1](\2)/g"

grep -rl "{% endhigh" .