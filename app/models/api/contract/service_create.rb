class Api::Contract::ServiceCreate < ApiAuthedBase
  include ContractPublishHandleError

  PATH = '/client/contract//service/create';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
