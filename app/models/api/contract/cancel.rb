class Api::Contract::Cancel < ApiAuthedBase
  
  PATH = '/client/contract/cancel';
  
  def path
    PATH
  end

end