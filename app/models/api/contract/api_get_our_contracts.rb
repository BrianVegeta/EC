class Api::Contract::ApiGetOurContracts < ApiAuthedBase
  
  PATH = '/client/contract/getOurContracts';
  
  def path
    PATH
  end

end