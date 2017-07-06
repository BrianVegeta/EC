class Api::Userprofile::FacebookUnbind < ApiAuthedBase
  
  PATH = '/client/user/facebook/unbind';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end