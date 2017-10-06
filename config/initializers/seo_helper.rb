SeoHelper.configure do |config|
  config.site_name = "ShareApp"
  config.site_name_formatter  = lambda do |title, site_name|
    "#{site_name} #{title}"
  end
end
