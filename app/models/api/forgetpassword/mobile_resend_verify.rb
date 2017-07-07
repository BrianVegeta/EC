class Api::Forgetpassword::MobileResendVerify < ApiBase
  
  PATH = '/client/fogetpassword/mobile/resend_verify';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end