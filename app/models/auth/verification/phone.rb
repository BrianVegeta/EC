class Auth::Verification::Phone < ApiBase

  def path
    '/client/register/mobile/verify'
  end

  def initialize params, browser_info
    self.request_params = params.merge browser_info
  end

  def private_session_data
    data = Hash.new
    data['apitoken'] = response_headers['apitoken']
    data['password'] = request_params['password']
    data
  end

  def warden_session
    response_data['user_profile'].merge private_session_data
  end
end
