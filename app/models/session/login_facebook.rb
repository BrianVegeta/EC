class Session::LoginFacebook < Session::Login

  def path
    '/client/session/fb/login'
  end

  def private_session_data
    data = Hash.new
    data['apitoken'] = response_headers['apitoken']
    data['access_token'] = request_params['access_token']
    data
  end
end
