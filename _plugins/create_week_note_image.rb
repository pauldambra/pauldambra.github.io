
require 'webdrivers/chromedriver'

def render_note(html_path, image_path)

  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  @driver = Selenium::WebDriver.for :chrome, options: options
  @driver.navigate.to "file:///" + html_path

  @driver.manage.window.resize_to(720, 600)

  @driver.save_screenshot image_path

  @driver.quit
end


Jekyll::Hooks.register :weeknotes, :post_write do |note|

  root_dir = note.path.sub(note.relative_path, "")
  note_path = note.permalink[0..-5]

  note_image_path = root_dir + "_site" + note_path + "png"
  note_html_path = root_dir + "_site" + note_path + "html"

  p note_html_path
  p note_image_path

  p '------------'

  render_note(note_html_path, note_image_path)

end
