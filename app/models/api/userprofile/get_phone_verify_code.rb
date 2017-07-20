class Api::Userprofile::GetPhoneVerifyCode < ApiAuthedBase

  PATH = '/client/user/update_phone/get_verify_code';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
