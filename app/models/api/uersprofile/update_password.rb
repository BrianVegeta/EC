class Api::Userprofile::UpdatePassword < ApiAuthedBase
  
  PATH = '/client/user/update_password';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end