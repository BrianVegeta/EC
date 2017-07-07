class Api::Contract::GetOurContracts < ApiAuthedBase
  
  PATH = '/client/contract/getOurContracts';
  
  def path
    PATH
  end

  def request_method
     :post_token
  end
  
end