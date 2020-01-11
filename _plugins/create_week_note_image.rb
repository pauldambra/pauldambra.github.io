require 'webdrivers/chromedriver'

def note_path_for(note, file_extension) 
  root_dir = note.path.sub(note.relative_path, "")
  note_path = note.permalink[0..-5]

  root_dir + "_site" + note_path + file_extension
end

def launch_chrome
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  Selenium::WebDriver.for :chrome, options: options
end

def render_note(html_path, image_path)
  browser = launch_chrome
  browser.navigate.to "file:///" + html_path
  browser.manage.window.resize_to(720, 600)
  browser.save_screenshot image_path
  browser.quit
end


Jekyll::Hooks.register :weeknotes, :post_write do |note|
  note_image_path = note_path_for(note, "png")
  note_html_path = note_path_for(note, "html")

  render_note(note_html_path, note_image_path)
end
