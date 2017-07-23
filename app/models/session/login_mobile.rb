class Session::LoginMobile < Session::Login

  def path
    '/client/session/mobile/login'
  end

  def private_session_data
    data = Hash.new
    data['apitoken'] = response_headers['apitoken']
    data['password'] = request_params['password']
    data
  end
end
