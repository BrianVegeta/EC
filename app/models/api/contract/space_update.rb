class Api::Contract::SpaceUpdate < ApiAuthedBase
  include ContractPublishHandleError

  PATH = '/client/contract/space/update';

  def path
    PATH
  end

  def request_method
     :post_token
  end

end
