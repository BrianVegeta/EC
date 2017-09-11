class Api::Contract::ItemUpdate < ApiAuthedBase
  include ContractPublishHandleError

  PATH = '/client/contract/used/item/update';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
