class Api::Contract::GetMyContracts < ApiAuthedBase
  
  PATH = '/client/contract/get_my_contracts';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end