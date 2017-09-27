class Auth::Registration::Facebook < ApiBase

  attr_accessor :picture, :name

  def path
    '/client/register/fb/regist'
  end

  def initialize params, browser_info
    self.picture = params['picture']
    self.name = params['name']
    self.request_params = params.merge browser_info
  end

  def private_session_data
    data = Hash.new
    data['apitoken'] = response_headers['apitoken']
    data['access_token'] = request_params['access_token']
    data['picture'] = self.picture
    data
  end

  def warden_session
    response_data['user_profile'].merge private_session_data
  end
end
