class Auth::Session::Logout < ApiAuthedBase
  PATH = '/client/contract/calendar';

  def path
    '/client/session/logout'
  end

  def request_method
    :post_token
  end
end
