class Api::Userprofile::SetFacebook < ApiAuthedBase
  
  PATH = '/client/user/set_facebook';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end