class Api::Ship::Create < ApiAuthedBase

  PATH = '/client/ship/7-11/order/create';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
