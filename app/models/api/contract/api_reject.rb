class Api::Contract::ApiReject < ApiAuthedBase
  
  PATH = '/client/contract/reject';
  
  def path
    PATH
  end

end