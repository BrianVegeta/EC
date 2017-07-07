class Api::Forgetpassword::EmailResendVerify < ApiBase
  
  PATH = '/client/fogetpassword/email/resend_verify';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end