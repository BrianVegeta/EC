class Api::Forgetpassword::MobileGetToken < ApiBase
  
  PATH = '/client/fogetpassword/mobile/get_token';
  
  def path
    PATH
  end

  def request_method
     :post
  end
  
end