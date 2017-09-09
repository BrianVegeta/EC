class Api::Contract::UsedItemCreate < ApiAuthedBase
  include ContractPublishHandleError

  PATH = '/client/contract/used/item/create';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
