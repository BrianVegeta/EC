class Api::Userprofile::UpdatePhone < ApiAuthedBase
  
  PATH = '/client/user/update_phone';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end