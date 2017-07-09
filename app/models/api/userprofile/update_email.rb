class Api::Userprofile::UpdateEmail < ApiAuthedBase
  
  PATH = '/client/user/update_email';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end