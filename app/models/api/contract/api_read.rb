class Api::Contract::ApiRead < ApiAuthedBase
  
  PATH = '/client/contract/read';
  
  def path
    PATH
  end

end