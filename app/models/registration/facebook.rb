class Registration::Facebook < Registration::Base

  attr_accessor :picture

  def path
    '/client/register/fb/regist'
  end

  def private_session_data
    data = Hash.new
    data['apitoken'] = response_headers['apitoken']
    data['access_token'] = request_params['access_token']
    data['picture'] = self.picture
    data
  end
end
