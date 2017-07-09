class Api::Userprofile::IsPwdExist < ApiAuthedBase
  
  PATH = '/client/user/is_pwd_exist';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end