class Api::Ship::Log < ApiAuthedBase

  PATH = '/client/ship/7-11/order/log';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
