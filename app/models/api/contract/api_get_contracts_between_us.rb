class Api::Contract::ApiGetContractsBetweenUs < ApiAuthedBase
  
  PATH = '/client/contract/get_contracts_between_us';
  
  def path
    PATH
  end

end