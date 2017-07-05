class Api::Contract::ApiSign < ApiAuthedBase
  
  PATH = '/client/contract/sign';
  
  def path
    PATH
  end

end