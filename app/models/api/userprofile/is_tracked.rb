class Api::Userprofile::IsTracked < ApiAuthedBase
  
  PATH = '/client/user/is_tracked';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end