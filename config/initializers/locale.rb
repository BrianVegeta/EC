# in config/initializer/locale.rb

# tell the I18n library where to find your translations
# I18n.load_path << Dir[ File.join(Rails.root, 'lib', 'locale', '*.{rb,yml}') ]

# set default locale to something other than :en
I18n.available_locales = [:"zh-TW"]
I18n.default_locale = :'zh-TW'
