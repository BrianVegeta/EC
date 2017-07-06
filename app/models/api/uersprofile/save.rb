class Api::Userprofile::Save < ApiAuthedBase
  
  PATH = '/client/user/save';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end