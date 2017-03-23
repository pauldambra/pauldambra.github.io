require 'thread'
require 'thwait'

# based on https://github.com/juusaw/amp-jekyll/
module Jekyll
  # Defines the base class of AMP posts
  class AmpPost < Page
    def initialize(site, base, dir, post)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'amp-post.html')

      self.data['body']          = post.content
      self.data['title']         = post.data['title']
      self.data['date']          = post.data['date']
      self.data['author']        = post.data['author']
      self.data['category']      = post.data['category']
      self.data['tags']          = post.data['tags']
      self.data['canonical_url'] = post.url
    end
  end
  # Generates a new AMP post for each existing post
  class AmpGenerator < Generator
    priority :low
    def generate(site)
      dir = site.config['ampdir'] || 'amp'
      threads = site.posts.docs.map do |post|
        Thread.new do
          index = AmpPost.new(site, site.source, File.join(dir, post.id), post)
          index.render(site.layouts, site.site_payload)
          index.write(site.dest)
          site.pages << index
        end
      end
      ThreadsWait.all_waits(*threads)
    end
  end
end
