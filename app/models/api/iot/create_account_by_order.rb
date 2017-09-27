class Api::Iot::CreateAccountByOrder < ApiIotBase

  PATH = '/register/regist/payment/order';

  def path
    PATH
  end

  def request_method
     :post
  end

end
