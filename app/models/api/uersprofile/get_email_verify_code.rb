class Api::Userprofile::GetEmailVerifyCode < ApiAuthedBase
  
  PATH = '/client/user/update_email/get_verify_code';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end