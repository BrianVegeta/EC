Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '742772655905768', 'a0d2d74ed3f4462525da73e9e3bb804a',
           :scope => 'email,user_birthday,read_stream', :display => 'popup'
end
