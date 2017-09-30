class Iot::Api::RegisOrder < ApiIotBase

  PATH = '/regist/order';

  def path
    PATH
  end

  def request_method
     :post
  end

end
