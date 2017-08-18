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

      thread_count = (ENV['THREADCOUNT'] || 8).to_i

      puts "using #{thread_count} threads for processing to AMP pages"
      puts "there are #{site.posts.docs.length} articles to process"

      queue = Queue.new
      threads = []

      site.posts.docs
        .reject { |post| post.data['skip_amp'] }
        .each   { |post| queue << post }

      thread_count.times do
        threads << Thread.new do
          loop do
            break if queue.empty?
            post = queue.pop(true) rescue nil
            if post
              index = AmpPost.new(site, site.source, File.join(dir, post.id), post)
              index.render(site.layouts, site.site_payload)
              index.write(site.dest)
              site.pages << index
            end
          end
          # when there is no more work, the thread will stop
        end
      end
      threads.each{|t| t.join}
      puts "all AMP posts generated"
    end
  end
end
