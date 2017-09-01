class Api::Forgetpassword::MobileReset < ApiBase

  PATH = '/client/fogetpassword/mobile/reset';

  def path
    PATH
  end

  def request_method
     :post
  end
end
