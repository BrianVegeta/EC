class Api::Userprofile::CheckPwd < ApiAuthedBase
  
  PATH = '/client/user/checkpwd';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end