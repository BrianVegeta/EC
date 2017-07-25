class Auth::Session::Login < ApiBase

  def path
    raise 'UNDEFINED PATH'
  end

  def initialize params, browser_info
    self.request_params = params.merge browser_info
  end

  def private_session_data
    raise 'UNDEFINED PRIVATE SESSION DATA'
  end

  def warden_session
    response_data['user_profile'].merge private_session_data
  end
end
