class Api::Iot::Login < ApiIotBase

  PATH = '/session/IoTAccountLogin';

  def path
    PATH
  end

  def request_method
     :post
  end

end
