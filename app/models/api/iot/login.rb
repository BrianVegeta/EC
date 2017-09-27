class Api::Iot::Login < ApiIotBase

  PATH = '/session/IoTAccount/login';

  def path
    PATH
  end

  def request_method
     :post
  end
end
