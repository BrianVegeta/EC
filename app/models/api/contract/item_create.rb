class Api::Contract::ItemCreate < ApiAuthedBase
  include ContractPublishHandleError

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
