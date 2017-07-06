class Api::Forgetpassword::MailGetToken < ApiBase
  
  PATH = '/client/fogetpassword/mail/get_token';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end