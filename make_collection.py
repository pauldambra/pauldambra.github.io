from os import listdir
from os.path import isfile, join
import re

def natural_key(string_):
    """See http://www.codinghorror.com/blog/archives/001018.html"""
    return [int(s) if s.isdigit() else s for s in re.split(r'(\d+)', string_)]

pngs = [f for f in sorted(listdir('.'), key=natural_key) if isfile(join('.', f)) and f.endswith(".png")]

items = []
for idx, png in enumerate(pngs):
  dict = {"ORDER": idx, "NAME" : png.split('.')[1], "FILE_NAME" : png }
  items.append(dict)

template = """---
order: {ORDER}
title: {NAME}
picture: /images/dear_diary_year_one/{FILE_NAME}
---

"""

for item in items:
  name = item['FILE_NAME'].replace('png', 'md')
  outF = open("../../_dear_diary_year_one/"+name, "w")
  outF.write(template.format(**item))
  outF.close()
