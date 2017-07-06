class Api::Forgetpassword::MailReset < ApiBase
  
  PATH = '/client/fogetpassword/mail/reset';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end