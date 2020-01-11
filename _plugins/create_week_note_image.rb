require 'webdrivers/chromedriver'

def launch_chrome
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  Selenium::WebDriver.for :chrome, options: options
end

@browser = launch_chrome

def path_for(note, file_extension) 
  root_dir = note.path.sub(note.relative_path, "")
  note_path = note.permalink[0..-5]
  "#{root_dir}_site#{note_path}#{file_extension}"
end

def render_note_image(html_path, image_path)
  @browser.navigate.to "file:///#{html_path}"
  @browser.manage.window.resize_to(720, 600)
  @browser.save_screenshot image_path
end

Jekyll::Hooks.register :weeknotes, :post_write do |note|
  html_path = path_for(note, "html")
  image_path = path_for(note, "png")
  render_note_image(html_path, image_path)
end
