class Api::Userprofile::Track < ApiAuthedBase
  
  PATH = '/client/user/track';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end