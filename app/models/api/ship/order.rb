class Api::Ship::Order < ApiAuthedBase

  PATH = '/client/ship/7-11/order';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
