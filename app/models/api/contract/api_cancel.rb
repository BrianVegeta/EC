class Api::Contract::ApiCancel < ApiAuthedBase
  
  PATH = '/client/contract/cancel';
  
  def path
    PATH
  end

end