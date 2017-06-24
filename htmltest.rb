require 'html-proofer'

# set -eu

# bundle exec htmlproofer \
#   _site \
#   --file-ignore /amp/,/.git/ \
#   --check-favicon \
#   --check-html \
#   --check-opengraph

# becomes

options = { 
  assume_extension: true,
  check_favicon: true,
  check_opengraph: true,
  check_html: true,
  file_ignore: ['/amp/', '/.git/'],
  parallel: { in_processes: 6 }
}
HTMLProofer.check_directory("./_site", options).run