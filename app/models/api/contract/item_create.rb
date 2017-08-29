class Api::Contract::ItemCreate < ApiAuthedBase

  PATH = '/client/contract/item/create';

  def path
    PATH
  end

  def request_method
     :post_token
  end

  def handle_response_error response
    raise response.inspect
    super
  end

end
