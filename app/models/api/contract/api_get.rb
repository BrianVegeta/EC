class Api::Contract::ApiGet < ApiAuthedBase
  
  PATH = '/client/contract/get';
  
  def path
    PATH
  end

end