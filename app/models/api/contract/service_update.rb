class Api::Contract::ServiceUpdate< ApiAuthedBase
  include ContractPublishHandleError

  PATH = '/client/contract//service/update';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
