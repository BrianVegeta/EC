class Api::Userprofile::CreatePassword < ApiAuthedBase
  
  PATH = '/client/user/create_password';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end