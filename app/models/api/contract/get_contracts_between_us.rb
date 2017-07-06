class Api::Contract::GetContractsBetweenUs < ApiAuthedBase
  
  PATH = '/client/contract/get_contracts_between_us';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end